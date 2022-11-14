import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [inputValue, setInputValue] = useState('')
    const addTaskHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const removeTaskHandler=(taskId:string)=>{
        props.removeTask(taskId)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <Button title={'xXx'} callback={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(
                    (t) => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={() => {}}/>
                                <span>{t.title}</span>
                                <button onClick={() =>removeTaskHandler(t.id)}>x</button>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
    </div>
}
