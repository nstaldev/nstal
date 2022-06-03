import { Button, ButtonProps, Icon, Spinner } from "@chakra-ui/react"
import { ActionStatus } from "@nstaldev/react-core";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { ActionButtonProps } from "../build/ActionButton";

const caption = (status: ActionStatus) => {
  switch(status) {
    case ActionStatus.NextToRun:
        return 'Run';
    case ActionStatus.Starting:
    case ActionStatus.Running:
      return <Spinner/>;
    case ActionStatus.Completed:
      return <Icon as={FaCheckCircle}/>
    case ActionStatus.Error:
    default:
      return <Icon as={FaExclamationCircle} color='red' />
  }
}

const ActionButton = (props: ActionButtonProps) => (
  <Button
    mt={3}
    backgroundColor='blue.700'
    {...props}
    textColor='white'
  >
    {caption(props.status)}
  </Button>
)

export default ActionButton
