import { Box, ChakraProps } from "@chakra-ui/react";
import { ActionStatus } from "@nstaldev/react-core";
import { ActionWrapperProps } from "@nstaldev/react-core/build/NstalComponents";

const color = (status: ActionStatus) => {
  switch(status) {
    case ActionStatus.Later:
      return 'gray.500';
    case ActionStatus.NextToRun:
    case ActionStatus.Starting:
    case ActionStatus.Running:
      return 'blue.500';
    case ActionStatus.Completed:
      return 'green.500';
    case ActionStatus.Error:
    default:
      return 'red.500';
  }
}

export const ActionWrapper = (props: ActionWrapperProps) => {
  let boxProps = {
    backgroundColor: 'inherit',
    p: 0,
    my: 0,
    borderRadius: 'none',
    textColor: 'inherit'
  };

  console.log(props.status);

  if (props.automated) {
    boxProps = {
      backgroundColor: color(props.status),
      p: 3,
      my: -3,
      borderRadius: 'md',
      textColor: 'white'
    };
  }

  return (
    <Box
      my={5}
    >
      <Box
        {...boxProps}
        transitionProperty='background-color, padding, border-radius, margin, text-color'
        transitionDuration='200ms'
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default ActionWrapper
