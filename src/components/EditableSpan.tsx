import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    callback:(title: string)=>void
}

export const EditableSpan = (props: PropsType) => {
    const [editActive, setEditActive] = useState(true)
    const [inputValue,setInputValue]=useState(props.title)
    const changeTitleHandler=()=>{
        if (!editActive){
            addTaskHandler()
        }
        setEditActive(!editActive)
    }

    const addTaskHandler = () => {
        if (inputValue.trim()!==''){
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
            : <input
                value={inputValue}
                onBlur={changeTitleHandler}
                autoFocus
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
    )
}
