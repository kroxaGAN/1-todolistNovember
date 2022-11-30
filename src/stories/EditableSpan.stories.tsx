import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, Meta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan";
import {TextField} from "@mui/material";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },

        title:{
            defaultValue:"HT",
            description: 'Start value EditableSpan'
        },
        callback:{
            description:"Editable span active"
        },

    },
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) =>
{
            const [editActive, setEditActive] = useState(true)
            const [inputValue, setInputValue] = useState(args.title)
            const changeTitleHandler = () => {
                if (!editActive) {
                    addTaskHandler()
                }
                setEditActive(!editActive)
            }

            const addTaskHandler = () => {
                if (inputValue.trim() !== '') {
                    args.callback(inputValue.trim())
                    setInputValue('')
                }

            }
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                setInputValue(event.currentTarget.value)
            }
            const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                    addTaskHandler()
                }
            }
            return (
                editActive
                    ? <span onDoubleClick={changeTitleHandler}>{args.title}</span>
: <TextField
    id="standard-basic"
    label="Standard"
    variant="standard"
    value={inputValue}
    onBlur={changeTitleHandler}
    autoFocus
    onChange={onChangeHandler}
    onKeyPress={onKeyPressHandler}
/>
)
}

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

EditableSpanStory.args = {
               callback: action('change Editable Span')
};
