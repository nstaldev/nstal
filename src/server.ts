import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
import { Server, ServerOptions } from "@open-rpc/server-js";
import { MethodMapping } from "@open-rpc/server-js/build/router";
import { HTTPServerTransportOptions } from "@open-rpc/server-js/build/transports/http";
import { Type } from "@open-rpc/meta-schema";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import doc from "./openrpc.json";
import { WebSocketTransport } from "@open-rpc/client-js";
import { WebSocketServerTransportOptions } from "@open-rpc/server-js/build/transports/websocket";

const methodMapping: MethodMapping = {
  addition: async (a: number, b: number) => a + b,
  subtraction: async (a: number, b: number) => a - b,
  'envFile:addVar': async (name: string, value: string): Promise<any> => {
    console.log(`TODO: Add entry ${name}=${value} to .env`);
    return '';
  }
};

const openrpcDocument: OpenrpcDocument = {
  openrpc: "1.0.0",
  info: {
    title: "node-json-rpc-server example",
    version: "1.0.0"
  },
  methods: [
    {
      name: "envFile:addVar",
      params: [
        { name: "name", schema: { type: "string" } },
        { name: "value", schema: { type: "string" } }
      ],
      result: { name: "dummy", schema: { type: "string" } }
    }
  ]
};

export async function start(port: number) {
  const serverOptions: ServerOptions = {
    openrpcDocument, //: await parseOpenRPCDocument(doc as OpenrpcDocument),
    transportConfigs: [
      {
        type: "WebSocketTransport",
        options: {
          port,
          middleware: [],
        } as WebSocketServerTransportOptions,
      }
    ],
    methodMapping
  };

  console.log("Starting Server"); // tslint:disable-line
  const s = new Server(serverOptions);

  s.start();
}
