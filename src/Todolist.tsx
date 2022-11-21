import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import './App.css';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId:string,taskId: string) => void
    changeFilter: (todolistId:string,value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeCheckBox:(taskId:string,IsDone:boolean)=>void
    filter:FilterValuesType
    todolistId:string
}

export function Todolist(props: PropsType) {
    const [inputValue, setInputValue] = useState('')
    const [error,setError]=useState<string | null>(null)
    const addTaskHandler = () => {
        if (inputValue.trim()!==''){
            props.addTask(inputValue.trim())
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
    const removeTaskHandler=(taskId:string)=>{
        props.removeTask(props.todolistId,taskId)
    }
    const changeSuperFilter=(value:FilterValuesType)=>{
        props.changeFilter(props.todolistId,value)
    }
    const checkBoxHandler=(event:ChangeEvent<HTMLInputElement>,taskId:string)=>{
        props.changeCheckBox(taskId,event.currentTarget.checked)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error":""}
            />
            <Button title={'xXx'} callback={addTaskHandler}/>
            {error && <div className="error-message">Title is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(
                    (t) => {
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={(event)=>checkBoxHandler(event,t.id)}
                                />
                                <span>{t.title}</span>
                                {/*<button onClick={() =>removeTaskHandler(t.id)}>x</button>*/}
                                <Button title={'remove'} callback={()=>removeTaskHandler(t.id)}/>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <Button
                title={"all"}
                callback={()=>changeSuperFilter('all')}
                filter={props.filter}
            />
            <Button title={"active"} callback={()=>changeSuperFilter('active')} filter={props.filter}/>
            <Button title={"completed"} callback={()=>changeSuperFilter('completed')} filter={props.filter}/>


        </div>
    </div>
}
