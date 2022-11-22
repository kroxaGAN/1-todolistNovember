import {FilterValuesType, TasksForTodolistType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = removeTaskACType
export const tasksReducer = (state: TasksForTodolistType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy={...state}
            return {...stateCopy,[action.todolistId]:stateCopy[action.todolistId].filter(el=>el.id!==action.id)}
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string,todolistId:string) => {
    return {
        type: 'REMOVE-TASK',
        id, todolistId
    } as const
}
