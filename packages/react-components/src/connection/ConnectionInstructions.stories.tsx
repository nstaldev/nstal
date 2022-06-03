import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ConnectionInstructions from './ConnectionInstructions';
import { ConnectionStatus } from '@nstaldev/react-core';

export default {
  title: 'Nstal/ConnectionStatus',
  component: ConnectionInstructions,
  argTypes: {},
} as ComponentMeta<typeof ConnectionInstructions>;

const Template: ComponentStory<typeof ConnectionInstructions> = (args) => <ConnectionInstructions {...args} />;

export const NotConnected = Template.bind({});
NotConnected.args = {
  command: 'lorem ipsum',
  status: ConnectionStatus.NotConnected
};

export const Connected = Template.bind({});
Connected.args = {
  command: 'lorem ipsum',
  status: ConnectionStatus.Connected
};

export const Error = Template.bind({});
Error.args = {
  status: ConnectionStatus.Error
};
