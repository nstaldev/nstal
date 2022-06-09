import { Box, Code, propNames } from "@chakra-ui/react"
import { ReactNode } from "react"

export type CodeSnippetProps = {
  children: ReactNode
}

export const CodeSnippet = (props: CodeSnippetProps) => (
  <Box
    p={2}
    background='gray.100'
    borderWidth={1}
    borderRadius='md'
    as='pre'
    overflowX='auto'
  >
    <Code backgroundColor='inherit'>
      {props.children}
    </Code>
  </Box>
)

export default CodeSnippet
