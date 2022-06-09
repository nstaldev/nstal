import { Box, Code } from "@chakra-ui/react"
import { CreateFileInstructionsProps } from "@nstaldev/react-core"
import CodeSnippet from "../../misc/CodeSnippet"

export const CreateFileInstructions = (props: CreateFileInstructionsProps) => (
  <>
    <Box as='p' mb={1}>
      Populate <Code>{props.path}</Code> with:
    </Box>
    <CodeSnippet>
      {props.content}
    </CodeSnippet>
  </>
)

export default CreateFileInstructions
