import {FilterValuesType, TodolistType} from "../AppWithReducers";
import {v1} from "uuid";

type ActionType = RemoveTodolistACType | AddTodolistACType
    | ChangeTodolistTitleACType | ChangeTodolistFilterACType
export const TodolistReducer = (state: TodolistType[], action: ActionType):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let copyState = [...state]
            return copyState.filter(el => el.todolistId !== action.id)
        }
        case 'ADD-TODOLIST': {
            let copyState = [...state]
            const newTodolist:TodolistType = {todolistId: action.todolistId, title: action.title, filter: 'all'}
            return [...copyState, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let copyState = [...state]
            return copyState.map(el => el.todolistId === action.id
                ? {...el, title: action.title}
                : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let copyState = [...state]
            return copyState.map(el => el.todolistId === action.id
                ? {...el, filter: action.filter}
                : el)
        }
        default:
            return state
    }
}

export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (todolistId:string,title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title, todolistId
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id, title
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id, filter
    } as const
}
