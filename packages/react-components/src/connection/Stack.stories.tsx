import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Stack, StackedElement, StackedElementProps } from './Stack';

export default {
  title: 'Nstal/Stack',
  component: Stack,
  argTypes: {},
} as ComponentMeta<typeof Stack>;

const Template: ComponentStory<typeof Stack> = (args) => 
  <Stack>
    <StackedElement active={true}>
      <p>Hello</p>
    </StackedElement>
    <StackedElement active={false}>
      <p>World!</p>
    </StackedElement>
  </Stack>;

export const Default = Template.bind({});
Default.args = {};
