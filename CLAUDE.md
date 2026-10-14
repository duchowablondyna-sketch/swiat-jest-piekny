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
- Pull request musi przejść testy "Poprawność HTML" i "Skan sekretów".

## Strona
- index.html — strona, miejsca.json — dane pinezek na mapie.
- Treści są po polsku, z poprawnymi polskimi znakami.

## Zawsze
- Repozytorium jest publiczne: nic tajnego w kodzie, commitach ani opisach.
- W opisie pull requesta wypisz: które pliki zmieniłeś, co i dlaczego, oraz listę swoich kroków z liczbą.
