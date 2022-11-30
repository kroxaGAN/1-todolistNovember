import {ButtonUniver} from "./ButtonUniver";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

type PropsType = {
    title: string
    callback: (title: string) => void
}

export const AddItemForm = memo((props: PropsType) => {
    // console.log('AddItemForm')
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            // props.addTask(props.todolistId,inputValue.trim())
            props.callback(inputValue.trim())
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
            /> 1
            <ButtonUniver title={props.title} callback={addTaskHandler}/>

        </div>
    )
})
