import React,  from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";
import {v1} from "uuid";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },

    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
    TaskIsDone.args = {
        task: {id: v1(), title: "HTML&CSS", isDone: true},
        editTitleTask: action('editTitleTask'),
        removeTask: action('removeTask'),
        changeCheckBox: action('changeCheckBox')
};
export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {id: v1(), title: "HTML&CSS", isDone: false},
    editTitleTask: action('editTitleTask'),
    removeTask: action('removeTask'),
    changeCheckBox: action('changeCheckBox')
};
