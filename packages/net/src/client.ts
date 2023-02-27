import { Client } from 'rpc-websockets'
import { Command, CommandContext, LocalAgent } from './commands';

export const initClient = (ws: Client) => ({
  authenticate: async (authToken: string) => {
    await ws.call('authenticate', [ authToken ]);
  },

  shellCd: async (path: string) => {
    await ws.call('runCommand', [ Command.ShellCd, path ]);
  },
  createFile: async (path: string, content: string) => {
    await ws.call('runCommand', [ Command.CreateFile, path, content ]);
  },
  installNpmPackage: async (packageList: string[], devDep: boolean, context: CommandContext) => {
    await ws.subscribe('output');
    ws.on('output', (output) => context.output(output));

    await ws.call('runCommand', [ Command.InstallNpmPackage, packageList, devDep ]);
  },
  readFile: async (path: string): Promise<string> => (
    ws.call('runCommand', [ Command.ReadFile, path ]) as Promise<string>
  ),
  runCommand: async (command: string, context: CommandContext) => {
    await ws.subscribe('output');
    ws.on('output', (output) => context.output(output));

    await ws.call('runCommand', [ Command.ShellCommand, command ]);
  }
});

enum ConnectionError {
  WebSocketError, AuthenticationError
}

const openConnection = async (sessionCode: string): Promise<LocalAgent> => {
  return new Promise<LocalAgent>((resolve, reject) => {
    var ws = new Client('ws://localhost:8790');
    let errorDetected = false;

    ws.on('open', () => {
      if (errorDetected) {
        return;
      }

      const client = initClient(ws);

      client.authenticate(sessionCode)
        .then(r => {
          resolve(client);
        })
        .catch(e => {
          reject(ConnectionError.AuthenticationError);
        });
    });

    ws.on('error', e => {
      ws.close();
      errorDetected = true;
      reject(ConnectionError.WebSocketError);
    })
  });
}

/**
 * Wait until a connection with the local agent is established,
 * or throw in case of authentication error.
 *
 * @returns A valid LocalAgent connection
 */
export const connectToLocalAgent = async (sessionCode: string): Promise<LocalAgent> => (
  new Promise<LocalAgent>(async (resolve, reject) => {
    let keepTrying = true;

    while(keepTrying) {
      try {
        const connection = await openConnection(sessionCode);
        keepTrying = false;
        resolve(connection);
      }
      catch(e) {
        if (e === ConnectionError.AuthenticationError) {
          keepTrying = false;
          reject();
        }

        // Nothing to do, just retry
      }

      await new Promise(r => setTimeout(r, 1000));
    }
  })
);
