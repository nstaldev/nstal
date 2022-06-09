import { Box, Code } from "@chakra-ui/react"
import { CreateFileInstructionsProps } from "@nstaldev/react-core"
import CodeSnippet from "../../misc/CodeSnippet"

export const CreateFileInstructions = (props: CreateFileInstructionsProps) => (
  <>
    <Box as='p'>
      Populate <Code>{props.path}</Code> with:
    </Box>
    <CodeSnippet code={props.content} />
  </>
)

export default CreateFileInstructions
