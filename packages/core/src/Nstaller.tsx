import Client from '@open-rpc/client-js'
import { createContext, ReactFragment, useContext, useEffect, useState } from "react";
import { IterableStatus, Iterator, useIterable } from './Iterator';

export enum ActionStatus {
  Later, NextToRun, Starting, Running, Completed, Error
}

export type NstalConnector = {
  client: Client | undefined;
  setClient: (c: Client) => void;
}

type NstalPlayerContext = {
  actionStates: ActionStatus[];
  setStatus: (status: ActionStatus, index: number) => void;
} & NstalConnector;

const NstalPlayerContext = createContext<NstalPlayerContext>({
  client: undefined,
  setClient: (c: Client) => {},
  actionStates: [],
  setStatus: (status: ActionStatus, index: number) => {}
});

export type NstalAction = {
  client?: Client;
  status: ActionStatus;
  setStatus: (status: ActionStatus) => void;
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
    }
  }
}

export type NstalMilestone = {
  reached: boolean;
}

export const useNstalMilestone = (): NstalMilestone => {
  const action = useNstalAction();

  useEffect(() => {
    if (action.client && action.status === ActionStatus.NextToRun) {
      action.setStatus(ActionStatus.Completed);
    }
  });

  return {
    reached: !!action.client && action.status !== ActionStatus.Later
  }
}

export const useNstalConnector = (): NstalConnector => {
  const context = useContext(NstalPlayerContext);
  return {
    client: context.client,
    setClient: context.setClient
  }
}

export type NstallerProps = {
  children: ReactFragment;
}

const Nstaller = (props: NstallerProps) => {
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
      }
    }}>
      <Iterator>
        {props.children}
      </Iterator>
    </NstalPlayerContext.Provider>
  )
}

export default Nstaller
