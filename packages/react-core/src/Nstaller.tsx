import Client from '@open-rpc/client-js'
import { createContext, ReactFragment, useContext, useEffect, useState } from "react";
import { IterableStatus, Iterator, useIterable } from './Iterator';
import NstalComponents from './NstalComponents';
import { ActionStatus } from './types';

type NstalPlayerContext = {
  client: Client | undefined;
  setClient: (c: Client) => void;
  actionStates: ActionStatus[];
  setStatus: (status: ActionStatus, index: number) => void;
  components?: NstalComponents;
};

const NstalPlayerContext = createContext<NstalPlayerContext>({
  client: undefined,
  setClient: (c: Client) => {},
  actionStates: [],
  setStatus: (status: ActionStatus, index: number) => {},
  components: undefined
});

export type NstalAction = {
  client?: Client;
  status: ActionStatus;
  setStatus: (status: ActionStatus) => void;
  components: NstalComponents;
}

export const useNstalAction = (): NstalAction => {
  const iterable = useIterable();
  const nstalContext = useContext(NstalPlayerContext);
  const [ finalStatus, setFinalStatus ] = useState<ActionStatus | null>(null);

  let status: ActionStatus;
  switch(iterable.status) {
  case(IterableStatus.NotConsumed):
    status = ActionStatus.Later;
    break;

  case(IterableStatus.Next):
    const index = iterable.index;
    if (index !== undefined && index < nstalContext.actionStates.length) {
      status = nstalContext.actionStates[index];
    } else {
      status = ActionStatus.NextToRun;
    }
    break;

  case(IterableStatus.Consumed):
    status = finalStatus || ActionStatus.Error;
    break;

  default:
    status = ActionStatus.Error;
    break;
  }

  const components = nstalContext.components;
  if (!components) {
    throw new Error('No NstalComponents provided. Make sure to pass some to the Nstaller');
  }

  return {
    client: nstalContext.client,
    status,
    setStatus: (status: ActionStatus) => {
      if (iterable.status === IterableStatus.Next && iterable.index !== undefined) {
        const newStatus = [...nstalContext.actionStates];
        newStatus[iterable.index] = status;
        nstalContext.setStatus(status, iterable.index);
        setFinalStatus(status);

        if (status === ActionStatus.Completed || status === ActionStatus.Error) {
          iterable.markAsRun();
        }
      }
    },
    components
  }
}

export type NstalMilestone = {
  reached: boolean;
  components: NstalComponents;
}

export const useNstalMilestone = (): NstalMilestone => {
  const action = useNstalAction();

  useEffect(() => {
    if (action.client && action.status === ActionStatus.NextToRun) {
      action.setStatus(ActionStatus.Completed);
    }
  });

  return {
    reached: !!action.client && action.status !== ActionStatus.Later,
    components: action.components
  }
}

export type NstalConnector = {
  client: Client | undefined;
  setClient: (c: Client) => void;
  components: NstalComponents;
}

export const useNstalConnector = (): NstalConnector => {
  const context = useContext(NstalPlayerContext);

  const components = context.components;
  if (!components) {
    throw new Error('No NstalComponents provided. Make sure to pass some to the Nstaller');
  }

  return {
    client: context.client,
    setClient: context.setClient,
    components
  }
}

export type NstallerProps = {
  components: NstalComponents;
  children: ReactFragment;
}

export const Nstaller = (props: NstallerProps) => {
  const [ client, setClient ] = useState<Client | undefined>(undefined);
  const [ actionStates, setActionStates ] = useState<ActionStatus[]>([]);

  return (
    <NstalPlayerContext.Provider value={{
      client,
      setClient: (c: Client) => setClient(c),
      actionStates,
      setStatus: (status: ActionStatus, index: number) => {
        const newStatus = [...actionStates];
        newStatus[index] = status;
        setActionStates(newStatus);
      },
      components: props.components
    }}>
      <Iterator>
        {props.children}
      </Iterator>
    </NstalPlayerContext.Provider>
  )
}
