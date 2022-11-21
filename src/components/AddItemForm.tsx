import {Button} from "./Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType={
    title:string
    callback:(title:string)=>void
}

export const AddItemForm=(props:PropsType)=>{
    const [inputValue, setInputValue] = useState('')
    const [error,setError]=useState<string | null>(null)
    const addTaskHandler = () => {
        if (inputValue.trim()!==''){
            // props.addTask(props.todolistId,inputValue.trim())
            props.callback(inputValue.trim())
            setInputValue('')
        } else {
            setError('Error')
        }

    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return(
        <div>
            <input
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error":""}
            />
            <Button title={props.title} callback={addTaskHandler}/>
            {error && <div className="error-message">Title is required</div>}
        </div>
    )
}
