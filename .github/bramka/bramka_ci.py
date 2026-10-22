# Bramka Jev: ocenia zgłoszenie, zanim ruszy agent Claude.
# Zasada: w razie jakiegokolwiek błędu decyzja = "blad" i agent NIE startuje.
import json, os, time, urllib.request

KATALOG = os.path.dirname(os.path.abspath(__file__))

def zapisz(decyzja, tekst):
    with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as f:
        f.write("decyzja=" + decyzja + "\n")
    with open("komentarz.md", "w", encoding="utf-8") as f:
        f.write(tekst)

try:
    with open(os.path.join(KATALOG, "zasady.json"), encoding="utf-8") as f:
        Z = json.load(f)
    tytul = os.environ.get("TYTUL", "")
    tresc = os.environ.get("TRESC", "")
    komentarz = os.environ.get("KOMENTARZ", "")
    zgloszenie = (tytul + "\n\n" + tresc).replace("@claude", "").strip()
    if komentarz:
        zgloszenie += "\n\nNowy komentarz: " + komentarz.replace("@claude", "").strip()

    cialo = {"model": Z["model"], "state": dict(Z["kontekst"], zgloszenie=zgloszenie), "questions": Z["pytania"]}
    zapytanie = urllib.request.Request("https://api.typesafe.ai/v1/systemone",
        data=json.dumps(cialo).encode("utf-8"),
        headers={"Authorization": "Bearer " + os.environ["TYPESAFE_API_KEY"], "Content-Type": "application/json"},
        method="POST")
    start = time.time()
    with urllib.request.urlopen(zapytanie, timeout=60) as odp:
        dane = json.loads(odp.read().decode("utf-8"))
    czas = time.time() - start

    nazwy = list(Z["pytania"].keys())
    odpowiedzi = dane.get("answers", {})
    wyniki = {n: odpowiedzi.get(n, {}).get("noul") for n in nazwy}
    if any(v is None for v in wyniki.values()):
        raise RuntimeError("Brak odpowiedzi na ktores pytanie")

    gora, dol = Z["progi"]["przepusc"], Z["progi"]["odrzuc"]
    if all(v >= gora for v in wyniki.values()):
        decyzja = "przepusc"
    elif any(v < dol for v in wyniki.values()):
        decyzja = "odrzuc"
    else:
        decyzja = "szara"

    naglowki = {
        "przepusc": "✅ **Bramka: przepuszczone** — agent może zaczynać.",
