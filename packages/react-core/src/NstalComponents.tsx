import { ReactNode } from "react";
import { ActionStatus } from "./types";

export type ActionButtonProps = {
  status: ActionStatus;
  label: string;
  onClick: () => void;
}

export type ActionWrapperProps = {
  children: React.ReactNode;
  status: ActionStatus;
  automated: boolean;
}

export type NstalComponents = {
  button: (props: ActionButtonProps) => ReactNode;
  wrapper: (props: ActionWrapperProps) => ReactNode;
}

export default NstalComponents
