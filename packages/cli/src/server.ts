import { HandleFunction } from "connect";
import fs, { writeFile } from 'fs/promises'
import { shellRunCommand, shellStartCommand } from "./commands/shell-command";
import WorkingDir from "./working-dir";
import { fileExists, readFile } from "./commands/file";
import { CommandContext, initServer } from '@nstaldev/net'
import { Server } from "rpc-websockets";


export async function start(sessionCode: string, port: number) {
  const server = new Server({
    port,
    host: 'localhost'
  });

  const pwd = new WorkingDir();

  initServer(server, sessionCode, {
    createFile: async (path: string, content: string): Promise<void> => {
      await writeFile(`${pwd.currentDir}/${path}`, content);
    },
    readFile: async (path: string): Promise<string> => (
      await readFile(`${pwd.currentDir}/${path}`)
    ),
    shellCd: async (path: string): Promise<void> => {
      pwd.currentDir = path;
    },
    installNpmPackage: async (packageList: string[], devDep: boolean, context: CommandContext): Promise<void> => {
      console.log("TODO: Install " + packageList);
    },
    runCommand: async (command: string, context: CommandContext) => {
      console.log("TODO: Run " + command);
    }
  });
}
