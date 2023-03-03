import { connectToLocalAgent, initClient, LocalAgent } from '@nstaldev/net';
import randomString from 'random-string'
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

export const Connection = (props: ConnectionProps) => {
  const [ connecting, setConnecting ] = useState<boolean>(false);
  const [ connected, setConnected ] = useState<ConnectionStatus>(ConnectionStatus.NotConnected);
  const [ sessionCode, setSessionCode ] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionCode) {
      setSessionCode(randomString({ length: 10 }));
    }
  }, [ sessionCode ]);

  useEffect(() => {
    if (!sessionCode || connecting) {
      return;
    }
    setConnecting(true);

    (async () => {
      try {
        const agent = await connectToLocalAgent(sessionCode);
        props.onConnect(agent);
        setConnected(ConnectionStatus.Connected);
      } catch(e) {
        // Auth error
        setConnected(ConnectionStatus.Error);
      }
    })();
  }, [ connecting, sessionCode, props ]);

  const command = `npx nstal@latest connect ${sessionCode}`;

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
