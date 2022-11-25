import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

type PropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = memo((props: PropsType) => {
    console.log('Editable span')
    const [editActive, setEditActive] = useState(true)
    const [inputValue, setInputValue] = useState(props.title)
    const changeTitleHandler = () => {
        if (!editActive) {
            addTaskHandler()
        }
        setEditActive(!editActive)
    }

    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            props.callback(inputValue.trim())
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
            ? <span onDoubleClick={changeTitleHandler}>{props.title}</span>
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
})
