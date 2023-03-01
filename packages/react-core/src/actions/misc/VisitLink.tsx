import BasicAction from "../../BasicAction";
import { NstalAction } from "../../Nstaller";

export type VisitLinkProps = {
  url: string
};

export const VisitLink = (props: VisitLinkProps) => (
  <BasicAction
    {...props}
    render={(nstalAction: NstalAction, props: VisitLinkProps) => (
      <p>Open <a href={props.url} target='_blank' rel="noreferrer">{props.url}</a> in another tab</p>
    )}
    run={async (action: NstalAction, props: VisitLinkProps) => {
      window?.open(props.url, '_blank')?.focus();
    }}
  />
)

export default VisitLink
