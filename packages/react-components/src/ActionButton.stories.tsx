import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActionButton from './ActionButton';
import { ActionStatus } from '@nstaldev/react-core';

export default {
  title: 'ActionButton',
  component: ActionButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ActionButton>;

const Template: ComponentStory<typeof ActionButton> = (args) => <ActionButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  status: ActionStatus.NextToRun,
};
