import { ReactNode } from "react";
import { ActionStatus } from "./types";

export type ActionButtonProps = {
  status: ActionStatus;
  onClick: () => void;
}

export type ActionWrapperProps = {
  children: React.ReactNode;
  status: ActionStatus;
  automated: boolean;
}

export enum ConnectionStatus {
  NotConnected,
  Connected,
  Error
}

export type ConnectionInstructionsProps = {
  command: string;
  status: ConnectionStatus;
}

export type NstalComponents = {
  button: (props: ActionButtonProps) => ReactNode;
  wrapper: (props: ActionWrapperProps) => ReactNode;
  connection: (props: ConnectionInstructionsProps) => ReactNode;
}

export default NstalComponents
