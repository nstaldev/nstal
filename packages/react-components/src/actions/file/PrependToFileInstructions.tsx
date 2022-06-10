import { Box, Code } from "@chakra-ui/react"
import { PrependToFileInstructionsProps } from "@nstaldev/react-core"
import CodeSnippet from "../../misc/CodeSnippet"

export const PrependToFileInstructions = (props: PrependToFileInstructionsProps) => (
  <>
    <Box as='p' mb={1}>
      Add the following at the beginning of <Code>{props.path}</Code>:
    </Box>
    <CodeSnippet>
      {props.content}
    </CodeSnippet>
  </>
)

export default PrependToFileInstructions
