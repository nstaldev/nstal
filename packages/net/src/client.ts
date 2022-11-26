import { Client } from 'rpc-websockets'
import { Command } from './commands';

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
  installNpmPackage: async (packageList: string[], devDep: boolean, onOutput?: (output: string) => void) => {
    if (onOutput) {
      await ws.subscribe('output');
      ws.on('output', (output) => onOutput(output));
    }
    await ws.call('runCommand', [ Command.InstallNpmPackage, packageList, devDep ]);
  },
  readFile: async (path: string): Promise<string> => (
    ws.call('runCommand', [ Command.ReadFile, path ]) as Promise<string>
  )
});
