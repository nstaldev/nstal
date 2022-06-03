import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActionWrapper  from './Wrapper';
import { ActionStatus } from '@nstaldev/react-core';

export default {
  title: 'Nstal/ActionWrapper',
  component: ActionWrapper,
  argTypes: {},
} as ComponentMeta<typeof ActionWrapper>;

const Template: ComponentStory<typeof ActionWrapper> = (args) => (
  <ActionWrapper {...args} >
    Hello world!
  </ActionWrapper>
);

export const NotConnected = Template.bind({});
NotConnected.args = {
  status: ActionStatus.Later,
  automated: false
};
