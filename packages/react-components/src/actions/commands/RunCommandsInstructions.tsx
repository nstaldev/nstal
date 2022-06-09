import { Box, Code, Flex, Icon, Spinner } from "@chakra-ui/react"
import { ExecutionStatus, RunCommandsInstructionsProps } from "@nstaldev/react-core";
import { FaCheckCircle, FaExclamation, FaExclamationCircle, FaPlay, FaPlayCircle, FaQuestion, FaQuestionCircle } from "react-icons/fa";

const StatusIcon = (props: { status?: ExecutionStatus }) => {
  switch(props.status) {
    case ExecutionStatus.Completed:
      return <Icon as={FaCheckCircle} color='green' />
    case ExecutionStatus.NotStarted:
      return <></>
    case ExecutionStatus.Running:
      return <Spinner size='sm' color='blue.500' />
    case ExecutionStatus.Error:
    default:
      return <Icon as={FaExclamationCircle} color='red' />
  }
}

const SingleCommand = (props: { command: string, status?: ExecutionStatus }) => (
  <Flex direction='row' alignItems='center'>
    <Code display='block' background='inherit' flexGrow={1} _before={{
      content: '">"',
      marginRight: '0.5rem',
      color: 'gray.300'
    }}>
      {props.command}
    </Code>
    {!!props.status && <StatusIcon status={props.status} />}
  </Flex>
)

export const RunCommandsInstructions = (props: RunCommandsInstructionsProps) => (
  <div>
    <Box as='p' mb={1}>
      Run the command{props.commands.length > 1 && 's'}:
    </Box>
    <Box p={2} background='gray.100' borderWidth={1} borderRadius='md'>
      {props.commands.map((command, i) => (
        <SingleCommand
          key={i}
          command={command}
          status={props.status ? props.status[i] : undefined}
        />
      ))}
    </Box>
  </div>
)

export default RunCommandsInstructions
