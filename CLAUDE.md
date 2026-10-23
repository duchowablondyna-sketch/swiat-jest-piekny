# Reguły projektu: swiat-jest-piekny (fabryka Claude Code)

## Kontekst
To prototyp typu tracer bullet: budujemy najcieńszą działającą ścieżkę issue → zmiana → pull request.
Rób dokładnie to, o co prosi issue, i nic więcej. Nie dodawaj „przy okazji” funkcji, plików, bibliotek ani porządków w kodzie.

## Tryb pracy
- Pracujesz samodzielnie. Zatwierdzeniem zadania jest treść issue — nie czekaj na akceptację planu.
- Jeśli issue jest niejasne albo wymaga więcej niż jednej małej zmiany: nie zgaduj. Napisz komentarz z konkretnym pytaniem i zakończ pracę.
- Każda zmiana idzie przez osobną gałąź i pull request. Nigdy nie commituj bezpośrednio do main.
- Nigdy nie scalaj (merge) pull requestów i nie zmieniaj ustawień repozytorium. Merge robi wyłącznie właścicielka.
- Nie zmieniaj plików w katalogu .github/ ani pliku CLAUDE.md, chyba że issue wprost o to prosi.
- Pull request musi przejść testy "Poprawność HTML", "Skan sekretów" i "Playwright".

## Strona
- index.html — strona, miejsca.json — dane pinezek na mapie.
- Treści są po polsku, z poprawnymi polskimi znakami.

## Testy: najpierw test, potem kod
- Testy strony są w folderze testy/ (Playwright). Robot uruchamia je przy każdym pull requeście.
- Jeśli zmieniasz to, jak strona wygląda albo działa: najpierw dodaj NOWY test, który sprawdza tę zmianę, potem zmień kod.
- Nowy test i zmiana kodu to jedna zmiana, nie dwie. Nie traktuj tego jako „więcej niż jednej małej zmiany”.
- Nowy test zapisz w osobnym pliku testy/<krotka-nazwa>.spec.js. Nie edytuj testy/strona.spec.js.
- Nigdy nie zmieniaj ani nie usuwaj istniejących testów, żeby przeszły. Jeśli istniejący test blokuje zadanie, napisz komentarz z pytaniem i zakończ pracę.
- Jeśli zmiana nie dotyczy zachowania strony (np. literówka w tekście), test nie jest wymagany. Napisz to wprost w opisie pull requesta.
- W opisie pull requesta podaj: nazwę pliku z testem i jednym zdaniem, co ten test sprawdza.

## Zawsze
- Repozytorium jest publiczne: nic tajnego w kodzie, commitach ani opisach.
- W opisie pull requesta wypisz: które pliki zmieniłeś, co i dlaczego, oraz listę swoich kroków z liczbą.
