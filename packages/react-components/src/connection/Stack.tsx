import { Box, Flex, Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

export type StackedElementProps = {
  children: ReactNode;
  active: boolean;
}

export const StackedElement = (props: StackedElementProps) => (
  <Flex
    gridColumn='1 / 1'
    gridRow='1 / 1'
    flexDirection='column'
    justifyContent='center'
    opacity={props.active ? 1 : 0}
    transitionProperty='opacity'
    transitionDuration='200ms'
    width='100%'
    height='100%'
  >
    {props.children}
  </Flex>
);

export const Stack = (props: { children: ReactNode }) => (
  <Grid>
    {props.children}
  </Grid>
)
