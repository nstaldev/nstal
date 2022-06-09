import { ReactNode } from "react";
import { useNstalMilestone } from "./Nstaller";

export type MilestoneProps = {
  children: ReactNode;
}

export const Milestone = (props: MilestoneProps) => {
  const milestone = useNstalMilestone();
  return milestone.reached
    ? <>{props.children}</>
    : null;
}

export default Milestone
