import { initClient, LocalAgent } from '@nstaldev/net';
import randomstring from 'randomstring'
import { ReactNode, useEffect, useState } from 'react';
import { ConnectionInstructionsProps, ConnectionStatus } from '../NstalComponents';
import { Client } from 'rpc-websockets'

export type ConnectionProps = {
  render: (props: ConnectionInstructionsProps) => ReactNode;
  onConnect: (agent: LocalAgent) => void;
}

enum ConnectionError {
  WebSocketError, AuthenticationError
}

const openConnection = async (sessionCode: string): Promise<LocalAgent> => {
  return new Promise<LocalAgent>((resolve, reject) => {
    var ws = new Client('ws://localhost:8790');
    const client = initClient(ws);

    try {
      client.authenticate(sessionCode);
    } catch(e) {
      reject(ConnectionError.AuthenticationError);
    }
  });
}

const tryToConnect = async (sessionCode: string): Promise<LocalAgent> => (
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
        const agent = await tryToConnect(sessionCode);
        props.onConnect(agent);
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
