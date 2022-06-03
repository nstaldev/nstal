import { NstalComponents } from "@nstaldev/react-core";

export const NstalReactComponents: NstalComponents = {
  button: (props) => (
    <button>{props.label}</button>
  ),
  wrapper: (props) => (
    <div>{props.children}</div>
  )
}

export default NstalReactComponents
