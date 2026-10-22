   // Testy strony "Świat jest piękny".
   // Zasada: testów nie wolno zmieniać tylko po to, żeby przeszły.
   const { test, expect } = require("@playwright/test");
   const fs = require("fs");
   const path = require("path");

   function poprawnaLiczba(wartosc, min, max) {
     return typeof wartosc === "number" && isFinite(wartosc) && wartosc >= min && wartosc <= max;
   }

   // Ile pinezek powinno być: tyle, ile poprawnych miejsc w miejsca.json (ta sama reguła co na stronie).
   const miejsca = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "miejsca.json"), "utf-8"));
   const oczekiwanePinezki = miejsca.filter(function (m) {
     return m && typeof m === "object" && poprawnaLiczba(m.szerokosc, -90, 90) && poprawnaLiczba(m.dlugosc, -180, 180);
   }).length;

   test("strona się otwiera i widać mapę", async ({ page }) => {
     await page.goto("/");
     await expect(page.locator("h1")).toHaveText("Świat jest piękny");
     const mapa = page.locator("#mapa");
     await expect(mapa).toBeVisible();
     await expect(mapa).toHaveClass(/leaflet-container/);
   });

   test("na mapie jest tyle pinezek, ile poprawnych miejsc w miejsca.json", async ({ page }) => {
     expect(oczekiwanePinezki).toBeGreaterThan(0);
     await page.goto("/");
     await expect(page.locator("#mapa .pinezka")).toHaveCount(oczekiwanePinezki);
     await expect(page.locator("#mapa-blad")).toBeHidden();
   });

   test("na telefonie (375 px) strona nie przewija się w bok", async ({ page }) => {
     await page.setViewportSize({ width: 375, height: 667 });
     await page.goto("/");
     await expect(page.locator("#mapa")).toBeVisible();
     const szerokosci = await page.evaluate(() => ({
       dokument: document.documentElement.scrollWidth,
       okno: window.innerWidth,
     }));
     expect(szerokosci.dokument).toBeLessThanOrEqual(szerokosci.okno);
   });
