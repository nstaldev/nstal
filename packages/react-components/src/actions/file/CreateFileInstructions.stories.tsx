import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CreateFileInstructions from './CreateFileInstructions';

export default {
  title: 'Nstal/CreateFileInstructions',
  component: CreateFileInstructions,
  argTypes: {},
} as ComponentMeta<typeof CreateFileInstructions>;

const Template: ComponentStory<typeof CreateFileInstructions> = (args) => <CreateFileInstructions {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  path: 'some-file.js',
  content: `if (isAGoodComponent) {
  console.log("CodeSnippet is okay");
}`
};
