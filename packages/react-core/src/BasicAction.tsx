import { ReactNode, useEffect } from "react";
import { NstalAction, useNstalAction } from "./Nstaller";
import { ActionStatus } from "./types";

export type BasicActionProps<ActionProps> = {
  run: (action: NstalAction, props: ActionProps) => Promise<void>;
  render: (action: NstalAction, props: ActionProps) => ReactNode;
}

export const BasicAction = <ActionProps,>(props: BasicActionProps<ActionProps> & ActionProps) => {
  const nstalAction = useNstalAction();

  useEffect(() => {
    const client = nstalAction.agent;

    if (nstalAction.status !== ActionStatus.Starting || !client) {
      return;
    }

    nstalAction.setStatus(ActionStatus.Running);

    (async () => {
      await props.run(nstalAction, props);
      nstalAction.setStatus(ActionStatus.Completed);
    })();
  }, [ nstalAction, props ]);

  return (
    <>
      {nstalAction.components.wrapper({
        status: nstalAction.status,
        automated: !!nstalAction.agent,
        children: (
          <>
            {props.render(nstalAction, props)}
            {nstalAction.agent &&  (
              nstalAction.status === ActionStatus.NextToRun ||
              nstalAction.status === ActionStatus.Starting ||
              nstalAction.status === ActionStatus.Running
            ) && (nstalAction.components.button({
              onClick: () => nstalAction.setStatus(ActionStatus.Starting),
              status: nstalAction.status
            }))}
          </>
        )
      })}
    </>
  );
}

export default BasicAction;
