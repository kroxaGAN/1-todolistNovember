import { todolistReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

test.skip('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
        {todolistId: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].todolistId).toBe(todolistId2)
})
