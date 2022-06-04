import RunCommands from "./RunCommands";

export type StartEverRunningCommandProps = {
  command: string;
};

export const StartEverRunningCommand = (props: StartEverRunningCommandProps) => (
  <RunCommands
    commands={[ props.command ]}
    nstalMethod="shellStartCommand"
  />
)

export default StartEverRunningCommand
