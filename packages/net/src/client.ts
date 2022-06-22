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
  }
});
