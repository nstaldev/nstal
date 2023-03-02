import { ReactFragment, useEffect, useState } from "react";
import BasicAction from "../../BasicAction";
import { ExecutionStatus, RunCommandsInstructionsProps } from "../../NstalComponents";
import { NstalAction } from "../../Nstaller";

const DEFAULT_METHOD = 'shellRunCommand';

export type RunCommandsProps = {
  nstalMethod: 'shellRunCommand' | 'shellStartCommand' | undefined;
} & RunCommandsInstructionsProps;

export const RunCommands = (props: RunCommandsProps) => {
  const [ commandStatus, setCommandStatus ] = useState<ExecutionStatus[]>(
    new Array(props.commands.length).fill(ExecutionStatus.NotStarted)
  );
  const [ commandOutput, setCommandOutput ] = useState<string[]>(
    new Array(props.commands.length).fill('')
  );

  return (
    <BasicAction
      {...props}
      status={commandStatus}
      output={commandOutput}

      render={(nstalAction, props) => nstalAction.components.runCommands({
        ...props
      })}

      run={async (action: NstalAction, props: RunCommandsProps) => {
        const newStatus = new Array(props.commands.length).fill(ExecutionStatus.NotStarted);
        const newOutput = new Array(props.commands.length).fill('');
        setCommandStatus(newStatus);

        for (let i = 0; i < props.commands.length; i++) {
          newStatus[i] = ExecutionStatus.Running;
          setCommandStatus(newStatus.slice());

          const command = props.commands[i];
          const response = await action.agent?.runCommand(command, {
            output: async (o) => {
              newOutput[i] += o;
              setCommandOutput(newOutput.slice());
            },
            complete: async() => {}
          });

          newStatus[i] = ExecutionStatus.Completed;
          setCommandStatus(newStatus);
        }
      }}
    />
  )
}

export default RunCommands
