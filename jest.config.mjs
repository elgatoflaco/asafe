import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup/jest.setup.ts"],
  testMatch: [
    "<rootDir>/src/__tests__/unit/**/*.test.{ts,tsx}",
    "<rootDir>/src/__tests__/integration/**/*.test.{ts,tsx}",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/src/__tests__/e2e/",
    "<rootDir>/src/__tests__/setup/",
  ],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(d3|d3-array|d3-scale|d3-shape|d3-selection|d3-transition|d3-axis|d3-ease|internmap|delaunator|robust-predicates)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
};

export default createJestConfig(config);
