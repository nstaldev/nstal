import { Server } from 'rpc-websockets'
import { Command, LocalAgent } from './commands'
import NodeWebSocket from 'ws'

export const initServer = (ws: Server, authToken: string, agent: LocalAgent) => {
  let authenticated = false;

  ws.event('output');

  ws.register('authenticate', (params) => {
    if (params[0] !== authToken) {
      throw new Error(`Incorrect authentication token ${params[0]} (expecting ${authToken})`);
    } else {
      console.log("Client authenticated");
      authenticated = true;
      return true;
    }
  });

  ws.register('runCommand', async (params) => {
    if (!authenticated) {
      throw new Error('Not authenticated');
    }

    switch(params[0]) {
      case(Command.CreateFile):
        await agent.createFile(params[1], params[2]);
        break;
      case(Command.ReadFile):
        return agent.readFile(params[1]);
      case(Command.ShellCd):
        await agent.shellCd(params[1]);
        break;
      case(Command.InstallNpmPackage):
        await agent.installNpmPackage(params[1], params[2], {
          complete: async () => {
            await ws.emit('complete');
          },
          output: async (output: string) => {
            await ws.emit('output', output);
          },
        });
        break;
      case(Command.ShellCommand):
        await agent.runCommand(params[1], {
          complete: async () => {
            await ws.emit('complete');
          },
          output: async (output: string) => {
            await ws.emit('output', output);
          }
        });
        break;
      case(Command.ShellStartCommand):
        await agent.startCommand(params[1], {
          complete: async () => {
            await ws.emit('complete');
          },
          output: async (output: string) => {
            await ws.emit('output', output);
          }
        });
        break;

      default:
        throw new Error(`Unknown command ${params[0]}`);
    }

    return true;
  });
}
