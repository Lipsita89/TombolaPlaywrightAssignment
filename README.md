# Tombola UI Automation Framework

UI test automation framework built with **Playwright** and **TypeScript**, featuring **Allure reporting** for rich test results and **Pino** logging.

## Tech Stack
- Playwright Test
- TypeScript
- Allure Reporting
- dotenv
- pino / pino-pretty

## Prerequisites
- Node.js (LTS recommended)
- npm
- Allure CLI

## Installation
```bash
npm install
npx playwright install
```

## Scripts
```bash
npm run test:headless
npm run test:headed
npm run test:debug
npm run test:UI
npm run test:chrome
npm run test:report
npm run allure:generate
npm run allure:open
```

## Allure Reporting
Run tests first, then:
```bash
npm run allure:generate
npm run allure:open
```


