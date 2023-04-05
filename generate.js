#!/usr/bin/env node

const { execSync } = require('child_process')
const readline = require('readline')
const util = require('util')
const fs = require('fs-extra')
const packageJson = require('./package.json')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const question = util.promisify(rl.question).bind(rl)

// eslint-disable-next-line no-extend-native
String.prototype.toKebabCase = function () {
  return this.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => '-' + chr).trim()
}

// main
async function main () {
  console.clear()

  const scope = await question('Enter Scope (default: @stephen-shopopop):') || 'stephen-shopopop'
  const scopeName = scope.toKebabCase()

  const name = await question('What is the name of the service ? ')
  const packageName = name.toKebabCase()

  const cmd = `npm init --scope=@${scopeName} -y -w ./services/${packageName}`
  console.log(cmd.toString())
  execSync(cmd.toString(), {
    cwd: __dirname,
    stdio: 'inherit'
  })

  // Generate npmignore
  await fs.outputFile(`./services/${packageName}/.npmignore`, `*
!dist/*
!package.json
!readme.md
`)

  // Generate reports dir
  await fs.outputFile(`./services/${packageName}/reports/.gitkeep`, '')

  // Generate scenarios
  await fs.outputFile(`./services/${packageName}/scenarios/sample.yaml`, `config:
  target: https://artillery.io
plugins:
  metrics-by-endpoint: {}
scenarios:
  - flow:
      - get:
          url: "/"
      - get:
          url: "/docs"
      - get:
          url: "/404"
          
`)

  // Generate readme.md
  await fs.outputFile(`./services/${packageName}/readme.md`, `[![Minimal node version](https://img.shields.io/static/v1?label=node&message=${packageJson.engines.node}&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Minimal npm version](https://img.shields.io/static/v1?label=npm&message=${packageJson.engines.npm}&logo=npm&color)](https://github.com/npm/cli/releases)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![macOS](https://svgshare.com/i/ZjP.svg)](https://svgshare.com/i/ZjP.svg)
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/)

# Artillery service template

## Description

Template artillery

## Contributing

1. npm run start -  Start artillery test
2. npm run report - Generate report html
3. npm run clean - Clean reports
`)

  // Generate package.json
  const pkg = require(`./services/${packageName}/package.json`)
  pkg.main = ''
  pkg.scripts = {
    start: 'artillery run ./scenarios/sample.yaml -o ./reports/sample_report.json',
    report: 'artillery report ./reports/sample_report.json',
    clean: 'rm -f reports/*.json && rm -f reports/*.json.html'
  }
  pkg.description = ''

  await fs.writeJSON(`./services/${packageName}/package.json`, pkg, { spaces: 2 })
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.warn(error)
    process.exitCode(1)
  })
