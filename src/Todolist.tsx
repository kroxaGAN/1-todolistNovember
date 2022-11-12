import React from "react";

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistType = {
    title: string,
    tasks: TaskType[]
}


export const Todolist = (props: TodolistType) => {
    const {title, tasks} = props
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
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
