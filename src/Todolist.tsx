import React from "react";
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
    filteredTasks:(value:FilterType)=>void
}


export const Todolist = (props: TodolistType) => {
    const {title, tasks,removeTask,filteredTasks} = props

    const delButtonHandler=(taskId:number)=>{
        removeTask(taskId)
    }
    const filterButtonClick=(filterValue:FilterType)=>{
        filteredTasks(filterValue)
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map((el) => {
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
