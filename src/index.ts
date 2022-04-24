#!/usr/bin/env node

import { Command } from 'commander'
import WebSocketServer from 'ws';
import { start } from './server';

const program = new Command();

program
  .name('nstal')
  .description('(I)nstal(l) stuff')
  .version('0.0.3');

program.command('connect')
  .description('Connect to an nstal session')
  .argument('<sessionCode>', 'Session code')
  .option<number>('-p, --port <port>', 'Port to connect to', parseInt, 8790)
  .action(async (sessionCode, options) => {
    await start(options.port);
  });

program.parse();
