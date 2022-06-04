import { useNstalConnector } from "../Nstaller";
import Connection from "./Connection"

export const Connector = () => {
  const connectorContext = useNstalConnector();
  return (
    <Connection
      onConnect={connectorContext.setClient}
      render={connectorContext.components?.connection}
    />
  );
}

export default Connector
