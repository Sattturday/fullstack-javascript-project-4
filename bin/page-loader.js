#!/usr/bin/env node

import { program } from 'commander'
import loadPage from '../src/index.js'

program
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .argument('<url>')
  .action((url, options) => {
    loadPage(url, options.output)
      .then((filepath) => {
        console.log(filepath)
      })
      .catch((err) => {
        console.error(err.message)
        process.exit(1)
      })
  })

program.parse()
