import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


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
    addTask: (todolistId:string,newTitle: string) => void
    changeCheckBox:(todolistId:string,taskId:string,IsDone:boolean)=>void
    filter:FilterValuesType
    todolistId:string
    removeTodolists:(todolistId:string)=>void
    editTitleTask:(todolistId:string,taskId:string,title:string)=>void
}

export function Todolist(props: PropsType) {

    const removeTaskHandler=(taskId:string)=>{
        props.removeTask(props.todolistId,taskId)
    }
    const changeSuperFilter=(value:FilterValuesType)=>{
        props.changeFilter(props.todolistId,value)
    }
    const checkBoxHandler=(event:ChangeEvent<HTMLInputElement>,taskId:string)=>{
        props.changeCheckBox(props.todolistId,taskId,event.currentTarget.checked)
    }
    const rewmoveTodoHandler=()=>{
        props.removeTodolists(props.todolistId)
    }
    const addTaskCompHandler=(title:string)=>{
        props.addTask(props.todolistId,title)
    }
    const updateTaskHandler=(value:string,taskId:string)=>{
        props.editTitleTask(props.todolistId,taskId,value)
    }

    return <div>
        <h3>{props.title}</h3>
        <button onClick={rewmoveTodoHandler}>DELTODO</button>
        <AddItemForm title={'ADDTASK'} callback={addTaskCompHandler}/>
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
                                {/*<span>{t.title}</span>*/}
                                <EditableSpan title={t.title} callback={(title)=>updateTaskHandler(title,t.id)}/>
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
