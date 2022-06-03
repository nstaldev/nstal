import { createContext, ReactFragment, useContext, useEffect, useState } from "react";

const IteratorContext = createContext({
  tokenAvailable: true,
  iterableIndex: 0,
  hasMoreIterables: true,
  markIterableAsConsumed: () => {},
  markIteratorAsConsumed: () => {},
});

export const CloseIterator = () => {
  const context = useContext(IteratorContext);

  useEffect(() => {
    if (context.tokenAvailable) {
      context.markIteratorAsConsumed();
    }
  }, [ context ]);

  return <></>
}

export const Iterator = (props: { children: ReactFragment }) => {
  const [ iterableIndex, setIterableIndex ] = useState<number>(0);
  const [ hasMoreIterables, setHasMoreIterables ] = useState<boolean>(true);

  const contextValue = {
    tokenAvailable: true,
    iterableIndex,
    hasMoreIterables,
    markIterableAsConsumed: () => {
      setIterableIndex(iterableIndex + 1);
    },
    markIteratorAsConsumed: () => {
      setHasMoreIterables(false);
    }
  };

  return (
    <IteratorContext.Provider value={contextValue}>
      {props.children}
      <CloseIterator />
    </IteratorContext.Provider>
  )
}

export enum IterableStatus {
  NotConsumed, Next, Consumed
}

export type Iterable = {
  status: IterableStatus;
  // When the iterable is next, this field contains its index. Otherwise, it is not populated.
  index?: number;
  markAsRun: () => void;
}

export const useIterable = (): Iterable => {
  const [ status, setStatus ] = useState<IterableStatus>(IterableStatus.NotConsumed);

  const context = useContext(IteratorContext);

  useEffect(() => {
    if (!context.tokenAvailable) {
      return;
    }

    if (status !== IterableStatus.Consumed) {
      context.tokenAvailable = false;
    }

    if (status === IterableStatus.NotConsumed) {
      setStatus(IterableStatus.Next);
    }
  }, [ status, context ]);

  return {
    status,
    index: status === IterableStatus.Next ? context.iterableIndex : undefined,
    markAsRun: () => {
      setStatus(IterableStatus.Consumed);
      context.markIterableAsConsumed();
    }
  }
}

export type IteratorStatus = {
  iterableIndex: number;
  hasMoreIterables: boolean;
};

export const useIteratorStatus = (): IteratorStatus => {
  const context = useContext(IteratorContext);

  return {
    iterableIndex: context.iterableIndex,
    hasMoreIterables: context.hasMoreIterables
  }
}
