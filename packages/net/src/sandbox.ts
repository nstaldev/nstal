import { Client, Server } from 'rpc-websockets'
import { initClient } from './client';
import { CommandContext } from './commands';
import { initServer } from './server'

// instantiate Server and start listening for requests
var server = new Server({
  port: 8080,
  host: 'localhost'
})

/*
server.event('output');
server.emit('output', [ "SERVER HELLO!" ]);
*/

initServer(server, '1234', {
  createFile: async (path: string, content: string): Promise<void> => {
    console.log("TODO: Create file " + path);
  },
  shellCd: async (path: string): Promise<void> => {
    console.log("TODO: cd " + path);
  },
  installNpmPackage: async (packageList: string[], devDep: boolean, context: CommandContext): Promise<void> => {
    console.log("TODO: Install " + packageList);
    context.output("Some output");
    context.output("Some more output");
    context.output("Last output");
    console.log("Install completed!");
    context.complete(0);
  },
  runCommand: async (command: string, context: CommandContext) => {
    console.log("TODO: Run " + command);
  },
  readFile: async (path: string): Promise<string> => {
    console.log("TODO: Read" + path);
    return 'TODO!!!';
  }
//    await readFile(`${this.workingDir.currentDir}/${path}`)
//  );
});

// close the server
//server.close()

// instantiate Client and connect to an RPC server
var ws = new Client('ws://localhost:8080')

ws.on('open', async () => {
  console.log("Opened!");

  /*
  await ws.subscribe('output');
  ws.on('output', (o) => {
    console.log("OUTPUT!!! " + o);
  })
*/

//  ws.emit('output', [ "HEY!!" ]);

  const client = initClient(ws);

  // call an RPC method with parameters
  try {
    await client.authenticate('1234');
    console.log("Authenticated!");

    await client.shellCd('new-dir');
    console.log("Run!");

    await client.installNpmPackage([ 'example '], false, (output) => {
      console.log("SOME OUTPUT: " + output);
    });
    console.log("Run!");
  }
  catch(e) {
    console.log("Error", e);
  }

  // close a websocket connection
  await ws.close()
})

console.log("Init end");
