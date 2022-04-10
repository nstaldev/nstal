#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command();

program
  .name('nstal')
  .description('(I)nstal(l) stuff')
  .version('0.0.3');

program.command('i')
  .description('Install something')
  .argument('<element>', 'element to install')
  .action(element => {
    const module = require(`./elements/${element}`);
    console.log(module);
  });

program.parse();
