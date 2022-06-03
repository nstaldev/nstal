import { Box, Code } from "@chakra-ui/react"
import { PrependToFileInstructionsProps } from "@nstaldev/react-core"

const PrependToFileInstructions = (props: PrependToFileInstructionsProps) => (
  <>
    <Box as='p'>
      Add the following at the beginning of <Code>{props.path}</Code>:
    </Box>
    <Box p={2} background='gray.100' borderWidth={1} borderRadius='md' as='pre'>
        <Code backgroundColor='inherit'>
          {props.content}
        </Code>
    </Box>
  </>
)

export default PrependToFileInstructions
