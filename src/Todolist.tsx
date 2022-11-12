import React, {useState} from "react";
import {FilterType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistType = {
    title: string,
    tasks: TaskType[],
    removeTask:(taskId:number)=>void
    // filteredTasks:(value:FilterType)=>void
    cleanTasks:()=>void
    nameButton:string
}


export const Todolist = (props: TodolistType) => {
    const {title, tasks,removeTask,cleanTasks, nameButton} = props

    const [filter,setFilter]=useState<FilterType>('all')
    const filteredTasks=(value:FilterType)=>{
        setFilter(value)
    }
    let filterTasks=tasks
    if (filter === 'active'){
        filterTasks=tasks.filter(el=>!el.isDone)
    }
    if (filter === 'completed'){
        filterTasks=tasks.filter(el=>el.isDone)
    }


    const delButtonHandler=(taskId:number)=>{
        removeTask(taskId)
    }
    const filterButtonClick=(filterValue:FilterType)=>{
        filteredTasks(filterValue)
    }
    const cleanTasksHandler=()=>{
        cleanTasks()
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <button onClick={cleanTasksHandler}>{`${nameButton} tasks`}</button>
            <ul>
                {
                    filterTasks.map((el) => {
                        return (
                            <li key={el.id}>
                                <input type="checkbox"
                                       checked={el.isDone}
                                       onChange={() => {
                                       }}
                                />
                                <span>{el.title}</span>
                                <button onClick={()=>delButtonHandler(el.id)}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>filterButtonClick('all')}>All</button>
                <button onClick={()=>filterButtonClick('active')}>Active</button>
                <button onClick={()=>filterButtonClick('completed')}>Completed</button>
            </div>
        </div>
    )
}
