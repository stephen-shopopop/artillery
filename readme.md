[![Minimal node version](https://img.shields.io/static/v1?label=node&message=%3E=18.13&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Minimal npm version](https://img.shields.io/static/v1?label=npm&message=%3E=8.19.3&logo=npm&color)](https://github.com/npm/cli/releases)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![macOS](https://svgshare.com/i/ZjP.svg)](https://svgshare.com/i/ZjP.svg)
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/)

# Artillery

## Description

Artillery, tests SRE & DevOps

## Installation nodejs via nvm (node version manager)

- [macos/linux](https://github.com/nvm-sh/nvm) or use Makefile command: ```make nvm```
- [windows](https://github.com/coreybutler/nvm-windows)

## Contributing

1. npm run lint - Lint your code.
2. npm run lint:fix - Lint & fix your code.

## Production

```bash
// Use node version
nvm use

// Start all scenarios parallel
npm run start

// Start all scenario with report parallel
npm test

// Clean all reports
npm run clean

// Generate html report
npm run report
```

### Package maintenance

A modern cli tool that keeps your deps fresh

```bash
npx taze
```
