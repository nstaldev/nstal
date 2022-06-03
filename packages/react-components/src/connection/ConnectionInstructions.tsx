import { Box, Button, Flex, Grid, Icon, Input, InputGroup, InputRightElement, Spinner, Text } from "@chakra-ui/react";
import { ConnectionInstructionsProps, ConnectionStatus } from "@nstaldev/react-core";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCheck, FaCopy } from "react-icons/fa";
import { Stack, StackedElement } from "./Stack";

const boxColor = (status: ConnectionStatus): string => {
  switch(status) {
    case(ConnectionStatus.NotConnected):
      return 'blue.500';
    case(ConnectionStatus.Connected):
      return 'green.500';
    case(ConnectionStatus.Error):
    default:
      return 'red.500';
  }
}

const ConnectionInstructions = (props: ConnectionInstructionsProps) => {
  const color = boxColor(props.status);

  const notConnected = (
    <Flex gap={10} alignItems='center'>
      <Box flexGrow={1}>
        <Text mb={2} fontSize='xl'>
          Run this command from an empty directory:
        </Text>

        <InputGroup size='md' backgroundColor='white' rounded='lg' textColor='black'>
          <Input
            pr='4.5rem'
            type='text'
            value={props.command}
            readOnly={true}
            style={{
              fontFamily: 'monospace'
            }}
          />
          <InputRightElement width='4.5rem'>
            <CopyToClipboard text={props.command}>
              <Button h='1.75rem' size='sm'>
                <Icon as={FaCopy} />
              </Button>
            </CopyToClipboard>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Spinner
        size={'xl'}
        color='white'
        thickness='0.3rem'
      />
    </Flex>
  );

  const connected = (
    <Flex alignItems='center' flexDir='column' gap={2}>
      <Box flexGrow={1} fontSize='3xl' textAlign='center'>
        You&apos;re all set!
      </Box>
      <Box>
        Connected to local nstal
      </Box>
    </Flex>
  );

  const error = (
    <Flex gap={10} alignItems='center'>
      <Box flexGrow={1} fontSize='xl' textAlign='center'>
        Oops! Please stop nstal CLI and refresh this page
      </Box>
    </Flex>
  );

  return (
    <Box
      backgroundColor={color}
      rounded='lg'
      p={6}
      textColor='white'
      transitionProperty='background-color'
      transitionDuration='200ms'
    >
      <Stack>
        <StackedElement active={props.status === ConnectionStatus.NotConnected}>
          {notConnected}
        </StackedElement>
        <StackedElement active={props.status === ConnectionStatus.Connected}>
          {connected}
        </StackedElement>
        <StackedElement active={props.status === ConnectionStatus.Error}>
          {error}
        </StackedElement>
      </Stack>
    </Box>
  )
}

export default ConnectionInstructions
