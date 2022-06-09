import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CodeSnippet from './CodeSnippet';

export default {
  title: 'Nstal/CodeSnippet',
  component: CodeSnippet,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CodeSnippet>;

const Template: ComponentStory<typeof CodeSnippet> = (args) => <CodeSnippet {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  code: `if (isAGoodComponent) {
  console.log("CodeSnippet is okay");
}`
};

export const Large = Template.bind({});
Large.args = {
  code: `if (isAGoodComponent) {
  console.log("CodeSnippet is okay, but its content is so long that it overflows, even if displayed in a large screen beucase I made sure to add many, many (too many) words on a single line.");
}`
};
