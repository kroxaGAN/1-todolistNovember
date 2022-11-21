import {TodolistType} from "../App";

type ActionType = {
    type: string
    [key: string]: any
}
export const todolistReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            let copyState=[...state]

            return copyState.filter(el=>el.todolistId!==action.id)
        default:
            throw new Error('I don\'t understand this type')
    }
}
