import { useNstalConnector } from "../Nstaller";
import Connection from "./Connection"

export const Connector = () => {
  const connectorContext = useNstalConnector();
  return (
    <Connection
      onConnect={connectorContext.setAgent}
      render={connectorContext.components?.connection}
    />
  );
}

export default Connector
