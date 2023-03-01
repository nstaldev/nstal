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

export enum ExecutionStatus {
  NotStarted, Running, Completed, Error
}

export type RunCommandsInstructionsProps = {
  commands: string[];
  status?: ExecutionStatus[];
  output?: string[];
}

export type CreateFileInstructionsProps = {
  path: string;
  content: string;
}

export type PrependToFileInstructionsProps = {
  path: string;
  content: string;
}

export type NstalComponents = {
  button: (props: ActionButtonProps) => ReactNode;
  wrapper: (props: ActionWrapperProps) => ReactNode;
  connection: (props: ConnectionInstructionsProps) => ReactNode;
  runCommands: (props: RunCommandsInstructionsProps) => ReactNode;
  createFile: (props: CreateFileInstructionsProps) => ReactNode;
  prependToFile: (props: PrependToFileInstructionsProps) => ReactNode;
}

export default NstalComponents
