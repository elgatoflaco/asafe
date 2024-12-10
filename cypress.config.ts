import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "https://localhost:3000",
    supportFile: "src/__tests__/e2e/support/e2e.ts",
    specPattern: "src/__tests__/e2e/**/*.cy.{js,jsx,ts,tsx}",
    fixturesFolder: "src/__tests__/e2e/fixtures",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    experimentalStudio: true,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    chromeWebSecurity: false,
    env: {
      cypress_reject_unauthorized: false,
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    setupNodeEvents(
      on,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      config
    ) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" || browser.name === "electron") {
          launchOptions.args.push("--ignore-certificate-errors");
        }
        return launchOptions;
      });
    },
  },
});
