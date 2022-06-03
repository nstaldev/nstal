import { NstalComponents } from "@nstaldev/react-core";
import ActionButton from "./ActionButton";
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
  )
}

export default NstalReactComponents
