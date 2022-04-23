#!/usr/bin/env node

import { Command } from 'commander'
import WebSocketServer from 'ws';

const program = new Command();

program
  .name('nstal')
  .description('(I)nstal(l) stuff')
  .version('0.0.3');

program.command('connect')
  .description('Connect to an nstal session')
  .argument('<sessionCode>', 'Session code')
  .option<number>('-p, --port <port>', 'Port to connect to', parseInt, 8790)
  .action((sessionCode, options) => {
    const wss = new WebSocketServer.Server({ port: options.port })

    wss.on("connection", ws => {
      console.log("new client connected");
      ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
        const msg = JSON.parse(data.toString());
        if (msg.command === 'auth') {
          if (msg.sessionCode === sessionCode) {
            ws.send(JSON.stringify({ status: 'ok' }));
          } else {
            ws.send(JSON.stringify({ status: 'invalidCode' }));
            ws.close();
          }
        } else if (msg.command === 'envFile:addvar') {
          console.log("Set var", msg.name, msg.value);
          ws.send(JSON.stringify({ status: 'ok' }));
        } else {
          console.log(`Unknown command ${msg.command})}`);
        }
      });

      ws.on("close", () => {
        console.log("the client has connected");
      });
      // handling client connection error
      ws.onerror = function () {
        console.log("Some Error occurred")
      }
    });
    console.log(`Listening on port ${options.port}`);
  });

program.parse();
