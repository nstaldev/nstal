import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
import { Server, ServerOptions } from "@open-rpc/server-js";
import { MethodMapping } from "@open-rpc/server-js/build/router";
import { HTTPServerTransportOptions } from "@open-rpc/server-js/build/transports/http";
import { Type } from "@open-rpc/meta-schema";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { WebSocketTransport } from "@open-rpc/client-js";
import { WebSocketServerTransportOptions } from "@open-rpc/server-js/build/transports/websocket";
import { HandleFunction } from "connect";
import { envFileAddEntry } from "./commands/env-file";
import { addCodeToFunction, addNamedImport } from "./commands/transform";
import fs, { writeFile } from 'fs/promises'
import { shellRunCommand, shellStartCommand } from "./commands/shell-command";
import WorkingDir from "./working-dir";
import { fileExists, readFile } from "./commands/file";

export const ServerDocument: OpenrpcDocument = {
  openrpc: "1.0.0",
  info: {
    title: "node-json-rpc-server example",
    version: "1.0.0"
  },
  methods: [
    {
      name: "shellRunCommand",
      params: [
        { name: "command", schema: { type: "string" } }
      ],
      result: { name: "status", schema: {
        type: "object",
        properties: {
          status: { type: "number" }
        }
      } }
    },
    {
      name: "shellStartCommand",
      params: [
        { name: "command", schema: { type: "string" } }
      ],
      result: { name: "status", schema: {
        type: "object",
        properties: {
          status: { type: "number" }
        }
      } }
    },
    {
      name: "authenticate",
      params: [
        { name: "sessionCode", schema: { type: "string" } }
      ],
      result: { name: "authenticated", schema: { type: "boolean" } }
    },
    {
      name: "envFileAddVar",
      params: [
        { name: "name", schema: { type: "string" } },
        { name: "value", schema: { type: "string" } }
      ],
      result: { name: "change", schema: { type: "string" } }
    },
    {
      name: "fileExists",
      params: [
        { name: "path", schema: { type: "string" } }
      ],
      result: { name: "result", schema: { type: "boolean" } }
    },
    {
      name: "readFile",
      params: [
        { name: "path", schema: { type: "string" } }
      ],
      result: { name: "result", schema: { type: "string" } }
    },
    {
      name: "writeFile",
      params: [
        { name: "path", schema: { type: "string" } },
        { name: "content", schema: { type: "string" } }
      ],
      result: { name: "result", schema: { type: "boolean" } }
    },
    {
      name: "addCodeToFunction",
      params: [
        { name: "path", schema: { type: "string" } },
        { name: "funcName", schema: { type: "string" } },
        { name: "code", schema: { type: "string" } },
        { name: "dependencies", schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                names: {
                  type: 'array',
                  items: { type: "string" }
                },
                package: { type: "string" }
              }
            }
          }
        }
      ],
      result: { name: "result", schema: { type: "boolean" } }
    },
  ],
};

export class ServerSession {
  sessionCode: string;
  authenticated = false;
  workingDir = new WorkingDir();

  constructor(sessionCode: string) {
    this.sessionCode = sessionCode;
  }

  checkAuthentication() {
    if (!this.authenticated) {
      console.log("Not authenticated!");
      throw new Error("Not authenticated");
    }
  }

  getMethodMapping(): MethodMapping {
    return {
      authenticate: async (sessionCode: string): Promise<boolean> => {
        this.authenticated = (this.sessionCode === sessionCode);
        console.log(`Authentication with ${sessionCode}: ${this.authenticated}`);
        return this.authenticated;
      },
      shellRunCommand: async (command: string): Promise<any> => {
        this.checkAuthentication();
        const status = await shellRunCommand(command, this.workingDir);
        return { status };
      },
      shellStartCommand: async (command: string): Promise<any> => {
        this.checkAuthentication();
        const status = await shellStartCommand(command, this.workingDir);
        return { status };
      },
      envFileAddVar: async (name: string, value: string): Promise<any> => {
        this.checkAuthentication();
        const change = await envFileAddEntry(name, value);
        return change.status;
      },

      // Files
      readFile: async (path: string): Promise<any> => {
        this.checkAuthentication();
        return await readFile(`${this.workingDir.currentDir}/${path}`);
      },
      writeFile: async (path: string, content: string): Promise<any> => {
        this.checkAuthentication();
        const change = await writeFile(`${this.workingDir.currentDir}/${path}`, content);
        return true;
      },
      fileExists: async (path: string): Promise<any> => {
        this.checkAuthentication();
        return await fileExists(`${this.workingDir.currentDir}/${path}`);
      },

      addCodeToFunction: async (path: string, funcName: string, code: string, deps: any): Promise<any> => {
        this.checkAuthentication();
        let newCode = addCodeToFunction(
          (await fs.readFile(path)).toString(), funcName, code
        );
        deps.forEach(dep => {
          newCode = addNamedImport(newCode, dep.names, dep.package);
        });
        await fs.writeFile(path, newCode);

        return true;
      }
    }
  }

  authenticationMiddleware(): HandleFunction {
    return async (req, res, next) => {
      console.log("Check auth: " + this.authenticated);
      if (!this.authenticated) {
        next(new Error("Not authenticated"));
        return;
      }
      next();
    }
  }
}

export async function start(sessionCode: string, port: number) {
  const session = new ServerSession(sessionCode);

  const serverOptions: ServerOptions = {
    openrpcDocument: ServerDocument,
    transportConfigs: [
      {
        type: "WebSocketTransport",
        options: {
          port,
          // This middleware doesn't work:
          // apparently, it is not called
          middleware: [ session.authenticationMiddleware() ],
        } as WebSocketServerTransportOptions,
      }
    ],
    methodMapping: session.getMethodMapping(),
  };

  console.log("Starting Server"); // tslint:disable-line
  const s = new Server(serverOptions);

  s.start();
}
