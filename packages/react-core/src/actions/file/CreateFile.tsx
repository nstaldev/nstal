import BasicAction from "../../BasicAction";
import { CreateFileInstructionsProps } from "../../NstalComponents";
import { NstalAction } from "../../Nstaller";

export type CreateFileProps = CreateFileInstructionsProps;

export const CreateFile = (props: CreateFileProps) => (
  <BasicAction
    {...props}
    render={(nstalAction: NstalAction) => nstalAction.components.createFile(props)}
    run={async (action: NstalAction, props: CreateFileProps) => {
      const r = await action.agent?.createFile(props.path, props.content);
    }}
  />
)

export default CreateFile
