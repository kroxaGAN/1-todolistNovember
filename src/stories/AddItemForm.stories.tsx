import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {TextField} from "@mui/material";
import {ButtonUniver} from "../components/ButtonUniver";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Add Item Form',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },
        callback:{
            description:"Button clicked inside form"
        }
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) =>
{
    // console.log('AddItemForm')
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>('Title is requered')
    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            // props.addTask(props.todolistId,inputValue.trim())
            args.callback(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is requered')
        }

    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="title"
                variant="outlined"
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                // className={error ? "error":""}
                error={!!error}
                helperText={error}
            />
            <ButtonUniver title={args.title} callback={addTaskHandler}/>

        </div>
    )
};

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
    AddItemFormStory.args = {
  callback:action('Button clicked')
};
export const AddItemFormWithErrorStory = TemplateWithError.bind({});
