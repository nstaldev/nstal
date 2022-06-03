import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RunCommandsInstructions, { ExecutionStatus, RunCommandsInstructionsProps } from './RunCommandsInstructions';

export default {
  title: 'Nstal/RunCommandsInstructions',
  component: RunCommandsInstructions,
  argTypes: {},
} as ComponentMeta<typeof RunCommandsInstructions>;

const Template: ComponentStory<typeof RunCommandsInstructions> = (args) => <RunCommandsInstructions {...args} />;

export const NotConnected = Template.bind({});
NotConnected.args = {
  commands: [
    "npm install -D tailwindcss postcss autoprefixer",
    "npx tailwindcss init -p"
  ]
};

export const Connected = Template.bind({});
Connected.args = {
  commands: [
    "cd my-project",
    "npm install -D tailwindcss postcss autoprefixer",
    "npx tailwindcss init -p",
    "ls -l"
  ],
  status: [
    ExecutionStatus.Completed,
    ExecutionStatus.Error,
    ExecutionStatus.Running,
    ExecutionStatus.NotStarted
  ]
};
