import BasicAction from "../../BasicAction";
import { PrependToFileInstructionsProps } from "../../NstalComponents";
import { NstalAction } from "../../Nstaller";

export type PrependToFileProps = PrependToFileInstructionsProps;

export const PrependToFile = (props: PrependToFileProps) => (
  <BasicAction
    {...props}
    render={(nstalAction: NstalAction, props: PrependToFileProps) => (nstalAction.components.prependToFile(props))}
    run={async (action: NstalAction, props: PrependToFileProps) => {
      const oldContent = await action.agent?.readFile(props.path);
      await action.agent?.createFile(props.path, `${props.content}\n\n${oldContent}`);
    }}
  />
)

export default PrependToFile
