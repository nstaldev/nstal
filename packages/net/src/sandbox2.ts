import { Client, Server } from 'rpc-websockets'
import { connectToLocalAgent, initClient } from './client';
import { CommandContext } from './commands';
import { initServer } from './server'

// instantiate Client and connect to an RPC server

(async () => {
  try {
    console.log('Trying to connect... yarn nstal connect 1234');

    const client = await connectToLocalAgent('1234');

    console.log("Connected!");

    await client.shellCd('new-dir');

    await client.createFile('HELLO', 'Hello!!');

    console.log("Create package...");

    await client.runCommand('npm init -y', {
      complete: async c => { console.log("Completed") },
      output: async o => console.log(o)
    });

    console.log("Install package...");

    await client.installNpmPackage(['randomstring'], false, {
      complete: async c => { console.log("Completed") },
      output: async o => console.log(o)
    });

    console.log("Done installing");

    console.log("Run!");
  } catch(e) {
    console.log(e);
  }
})();

/*
var ws = new Client('ws://localhost:8790')

ws.on('open', async () => {

  const client = initClient(ws);

  // call an RPC method with parameters
  try {
    await client.authenticate('12345');
    console.log("Authenticated!");

    console.log("Let's go!");

    await client.shellCd('new-dir');
    console.log("Run!");

    await client.installNpmPackage([ 'tailwind'], false, (output) => {
      console.log("SOME OUTPUT: " + output);
    });

    const content = await client.readFile('package.json');

    console.log("Run!");
  }
  catch(e) {
    console.log("Error", e);
  }

  // close a websocket connection
  await ws.close()
})

console.log("Init end");
*/
