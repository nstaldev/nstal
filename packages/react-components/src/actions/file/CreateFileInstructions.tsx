import { Box, Code } from "@chakra-ui/react"
import { CreateFileInstructionsProps } from "@nstaldev/react-core"

export const CreateFileInstructions = (props: CreateFileInstructionsProps) => (
  <>
    <Box as='p'>
      Populate <Code>{props.path}</Code> with:
    </Box>
    <Box p={2} background='gray.100' borderWidth={1} borderRadius='md' as='pre'>
        <Code backgroundColor='inherit'>
          {props.content}
        </Code>
    </Box>
  </>
)

export default CreateFileInstructions
