import { NstalComponents } from "@nstaldev/react-core";
import ActionButton from "./ActionButton";
import RunCommandsInstructions from "./actions/commands/RunCommandsInstructions";
import CreateFileInstructions from "./actions/file/CreateFileInstructions";
import PrependToFileInstructions from "./actions/file/PrependToFileInstructions";
import ActionWrapper from "./actions/Wrapper";
import ConnectionInstructions from "./connection/ConnectionInstructions";

export const NstalReactComponents: NstalComponents = {
  button: (props) => (
    <ActionButton {...props} />
  ),
  wrapper: (props) => (
    <ActionWrapper {...props}/>
  ),
  connection: (props) => (
    <ConnectionInstructions {...props} />
  ),
  runCommands: (props) => (
    <RunCommandsInstructions  {...props} />
  ),
  createFile: (props) => (
    <CreateFileInstructions {...props} />
  ),
  prependToFile: (props) => (
    <PrependToFileInstructions {...props} />
  )
}

export default NstalReactComponents
