import { ReactNode } from "react";
import { useNstalMilestone } from "./Nstaller";

export type MilestoneProps = {
  children: ReactNode;
}

const Milestone = (props: MilestoneProps) => {
  const milestone = useNstalMilestone();
  return milestone.reached ? props.children : null;
}

export default Milestone
