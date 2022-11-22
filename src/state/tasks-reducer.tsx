import {TasksForTodolistType} from "../App";

type ActionType = removeTaskACType | addTaskACType
    | changeTaskStatusACType | changeTaskTitleACType
export const tasksReducer = (state: TasksForTodolistType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            return {...stateCopy, [action.todolistId]: stateCopy[action.todolistId].filter(el => el.id !== action.id)}
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const taskNew = {id: '4', title: action.title, isDone: false}
            return {...stateCopy, [action.todolistId]: [taskNew, ...stateCopy[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            let stateCopy = {...state}
            return {...stateCopy,[action.todolistId]:stateCopy[action.todolistId].map(el=>
                el.id===action.id ? {...el,isDone:action.isDone}:el)}
        }
        case "CHANGE-TITLE-TASK":{
            let stateCopy={...state}
            return {...stateCopy,[action.todolistId]:stateCopy[action.todolistId].map(el=>
                el.id===action.id ? {...el, title:action.title} :el)}
        }
        default:
            throw new Error('I don\'t understand this type')
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

type changeTaskTitleACType=ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC=(id: string, title: string, todolistId: string)=>{
    return{
        type:'CHANGE-TITLE-TASK',
        id,title,todolistId
    }as const
}
