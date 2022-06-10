import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PrependToFileInstructions from './PrependToFileInstructions';

export default {
  title: 'Nstal/PrependToFileInstructions',
  component: PrependToFileInstructions,
  argTypes: {},
} as ComponentMeta<typeof PrependToFileInstructions>;

const Template: ComponentStory<typeof PrependToFileInstructions> = (args) => <PrependToFileInstructions {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  path: 'some-file.js',
  content: `The first line!`
};
