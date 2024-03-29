import {TasksForTodolistType} from "../App";
import {AddTodolistACType, FetchTodolistsActionType, RemoveTodolistACType} from "./todolists-reducer";
import {v1} from "uuid";

type ActionType = removeTaskACType | addTaskACType
    | changeTaskStatusACType | changeTaskTitleACType
    | AddTodolistACType | RemoveTodolistACType | FetchTodolistsActionType
const initialState:TasksForTodolistType={}

export const tasksReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case "FETCH-TODOLISTS":{
            const copyState={...state}
            action.todolists.map(el=>{
                copyState[el.todolistId]=[]
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            return {...stateCopy, [action.todolistId]: stateCopy[action.todolistId].filter(el => el.id !== action.id)}
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const taskNew = {id: v1(), title: action.title, isDone: false}
            return {...stateCopy, [action.todolistId]: [taskNew, ...stateCopy[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            let stateCopy = {...state}
            return {
                ...stateCopy, [action.todolistId]: stateCopy[action.todolistId].map((el) =>{
                    return(
                        el.id === action.id ? {...el, isDone: action.isDone} : el
                    )
                }
                )
            }
        }
        case "CHANGE-TITLE-TASK": {
            let stateCopy = {...state}
            return {
                ...stateCopy, [action.todolistId]: stateCopy[action.todolistId].map(el =>
                    el.id === action.id ? {...el, title: action.title} : el)
            }
        }
        case "ADD-TODOLIST":{
            const stateCopy={...state}
            return {...stateCopy,[action.todolistId]:[]}
        }
        case "REMOVE-TODOLIST":{
            const stateCopy={...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id, todolistId
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title, todolistId
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id, isDone, todolistId
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        id, title, todolistId
    } as const
}
