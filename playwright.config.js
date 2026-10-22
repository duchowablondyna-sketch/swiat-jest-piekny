   // Konfiguracja robota testującego (Playwright).
   // Robot uruchamia prosty serwer ze stroną i sprawdza ją w przeglądarce Chromium.
   const { defineConfig, devices } = require("@playwright/test");

   module.exports = defineConfig({
     testDir: "./testy",
     timeout: 30000,
     retries: 0,
     reporter: "list",
     use: {
       baseURL: "http://127.0.0.1:4173",
     },
     webServer: {
       command: "python3 -m http.server 4173 --bind 127.0.0.1",
       url: "http://127.0.0.1:4173",
       reuseExistingServer: false,
       timeout: 30000,
     },
     projects: [
       { name: "chromium", use: { ...devices["Desktop Chrome"] } },
     ],
   });
