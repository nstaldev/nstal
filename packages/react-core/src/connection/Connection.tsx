import Client, { RequestManager } from '@open-rpc/client-js'
import randomstring from 'randomstring'
import { ReactNode, useEffect, useState } from 'react';
import { ConnectionInstructionsProps, ConnectionStatus } from '../NstalComponents';

export type ConnectionProps = {
  render: (props: ConnectionInstructionsProps) => ReactNode;
  onConnect: (client: Client) => void;
}

enum ConnectionError {
  WebSocketError, AuthenticationError
}

const openConnection = async (sessionCode: string): Promise<Client> => {
  const rpcClient = await import('@open-rpc/client-js');

  return new Promise<Client>((resolve, reject) => {
    const transport = new rpcClient.WebSocketTransport("ws://localhost:8790");
    transport.connection.onerror = () => {
      reject(ConnectionError.WebSocketError);
    }

    const client = new Client(new RequestManager([transport]));

    client.request({
      method: "authenticate",
      params: [ sessionCode ]
    }).then(r => {
      if (r) {
        resolve(client);
      } else {
        reject(ConnectionError.AuthenticationError);
      }
    });
  });
}

const tryToConnect = async (sessionCode: string): Promise<Client> => (
  new Promise<Client>(async (resolve, reject) => {
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

export const Connection = (props: ConnectionProps) => {
  const [ connecting, setConnecting ] = useState<boolean>(false);
  const [ connected, setConnected ] = useState<ConnectionStatus>(ConnectionStatus.NotConnected);
  const [ sessionCode, setSessionCode ] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionCode) {
      setSessionCode(randomstring.generate(10));
    }
  }, [ sessionCode ]);

  useEffect(() => {
    if (!sessionCode || connecting) {
      return;
    }
    setConnecting(true);

    (async () => {
      try {
        const client = await tryToConnect(sessionCode);
        props.onConnect(client);
        setConnected(ConnectionStatus.Connected);
      }
      catch(e) {
        // Auth error
        setConnected(ConnectionStatus.Error);
      }
    })();
  }, [ connecting, sessionCode, props ]);

  const command = `npx nstal connect ${sessionCode}`;

  return (
    <>
      {props.render({
        command,
        status: connected
      })}
    </>
  )
}

export default Connection
