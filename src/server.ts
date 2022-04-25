import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
import { Server, ServerOptions } from "@open-rpc/server-js";
import { MethodMapping } from "@open-rpc/server-js/build/router";
import { HTTPServerTransportOptions } from "@open-rpc/server-js/build/transports/http";
import { Type } from "@open-rpc/meta-schema";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import doc from "./openrpc.json";
import { WebSocketTransport } from "@open-rpc/client-js";
import { WebSocketServerTransportOptions } from "@open-rpc/server-js/build/transports/websocket";
import { HandleFunction } from "connect";

export const ServerDocument: OpenrpcDocument = {
  openrpc: "1.0.0",
  info: {
    title: "node-json-rpc-server example",
    version: "1.0.0"
  },
  methods: [
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
      result: { name: "dummy", schema: { type: "string" } }
    }
  ]
};

export class ServerSession {
  sessionCode: string;
  authenticated = false;

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
      envFileAddVar: async (name: string, value: string): Promise<any> => {
        this.checkAuthentication();
        console.log(`TODO: Add entry ${name}=${value} to .env`);
        return '';
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
