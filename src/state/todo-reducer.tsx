import {FilterValuesType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodolistACType | AddTodolistACType
    |ChangeTodolistTitleACType | ChangeTodolistFilterACType

export const todoReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let copyState = [...state]
            return copyState.filter(el => el.todolistId !== action.id)
        }
        case 'ADD-TODOLIST': {
            let copyState = [...state]
            const newTodolist = {todolistId: action.todolistId, title: action.title, filter: 'all'}
            return [...copyState, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let copyState = [...state]
            return copyState.map(el => el.todolistId === action.id
                ? {...el,title:action.title}
                : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let copyState = [...state]
            return copyState.map(el => el.todolistId === action.id
                ? {...el,filter:action.filter}
                : el)
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export type RemoveTodolistACType=ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC=(id:string)=>{
    return{
        type:'REMOVE-TODOLIST',
        id
    }as const
}

export type AddTodolistACType=ReturnType<typeof AddTodolistAC>
export const AddTodolistAC=(title:string)=>{
    const todolistId=v1()
    return{
        type:'ADD-TODOLIST',
        title, todolistId
    }as const
}

type ChangeTodolistTitleACType=ReturnType<typeof ChangeTodolistTitleAC>
export const ChangeTodolistTitleAC=(id:string,title:string)=>{
    return{
        type:'CHANGE-TODOLIST-TITLE',
        id, title
    }as const
}

type ChangeTodolistFilterACType=ReturnType<typeof ChangeTodolistFilterAC>
export const ChangeTodolistFilterAC=(id:string,filter:FilterValuesType)=>{
    return{
        type:'CHANGE-TODOLIST-FILTER',
        id,filter
    }as const
}
