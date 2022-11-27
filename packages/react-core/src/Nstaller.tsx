import { LocalAgent } from '@nstaldev/net';
import { createContext, ReactFragment, useContext, useEffect, useState } from "react";
import { IterableStatus, Iterator, useIterable } from './Iterator';
import NstalComponents from './NstalComponents';
import { ActionStatus } from './types';

type NstalPlayerContext = {
  agent: LocalAgent | undefined;
  setAgent: (a: LocalAgent) => void;
  actionStates: ActionStatus[];
  setStatus: (status: ActionStatus, index: number) => void;
  components?: NstalComponents;
};

const NstalPlayerContext = createContext<NstalPlayerContext>({
  agent: undefined,
  setAgent: (a: LocalAgent) => {},
  actionStates: [],
  setStatus: (status: ActionStatus, index: number) => {},
  components: undefined
});

export type NstalAction = {
  agent?: LocalAgent;
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
    agent: nstalContext.agent,
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
    if (action.agent && action.status === ActionStatus.NextToRun) {
      action.setStatus(ActionStatus.Completed);
    }
  });

  return {
    reached: !!action.agent && action.status !== ActionStatus.Later,
    components: action.components
  }
}

export type NstalConnector = {
  agent: LocalAgent | undefined;
  setAgent: (a: LocalAgent) => void;
  components: NstalComponents;
}

export const useNstalConnector = (): NstalConnector => {
  const context = useContext(NstalPlayerContext);

  const components = context.components;
  if (!components) {
    throw new Error('No NstalComponents provided. Make sure to pass some to the Nstaller');
  }

  return {
    agent: context.agent,
    setAgent: context.setAgent,
    components
  }
}

export type NstallerProps = {
  components: NstalComponents;
  children: ReactFragment;
}

export const Nstaller = (props: NstallerProps) => {
  const [ agent, setAgent ] = useState<LocalAgent | undefined>(undefined);
  const [ actionStates, setActionStates ] = useState<ActionStatus[]>([]);

  return (
    <NstalPlayerContext.Provider value={{
      agent,
      setAgent: (a: LocalAgent) => setAgent(a),
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
