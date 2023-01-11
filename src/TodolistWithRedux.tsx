import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material'
import {TaskWithRedux} from "./components/TaskWithRedux";
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
   todolist:TodolistType
}

export const TodolistWithRedux= memo(({todolist}: PropsType)=> {
    // console.log('Todolist')
    const {todolistId,title,filter}=todolist
    let tasks=useSelector<AppRootStateType,TaskType[]>(state=>state.tasks[todolistId])
    const dispatch=useDispatch()

    // const removeTaskHandler = useCallback((taskId: string) => {
    //     dispatch(removeTaskAC(taskId,todolistId))
    // },[])
    const changeSuperFilter = useCallback((value: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todolistId,value))
    },[])
    // const checkBoxHandler = useCallback((taskId: string, IsDone: boolean) => {
    //     dispatch(changeTaskStatusAC(taskId,IsDone,todolistId))
    // },[])
    const rewmoveTodoHandler = () => {
        dispatch(RemoveTodolistAC(todolistId))
    }
    const addTaskCompHandler = useCallback((title: string) => {
        dispatch(addTaskAC(title,todolistId))
    },[])
    // const updateTaskHandler = useCallback((value: string, taskId: string) => {
    //     dispatch(changeTaskTitleAC(taskId,value,todolistId))
    // },[])
    const updateTodoTitleHandler = useCallback((title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId,title))
    },[])


    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return <div>
        <EditableSpan title={title} callback={updateTodoTitleHandler}/>
        <IconButton onClick={rewmoveTodoHandler}>
            <Delete/>
        </IconButton>

        <AddItemForm title={'ADDTASK'} callback={addTaskCompHandler}/>
        <ul>
            {
                tasks.map(
                    (t) => {
                        return (
                            <>
                                <TaskWithRedux task={t} todolistId={todolistId}/>
                            </>
                            )

                    }
                )
            }
        </ul>
        <div>
            <Button
                variant="text"
                onClick={() => changeSuperFilter('all')}
                color={filter === 'all'? 'success' : 'secondary'}
            >all</Button>
            <Button
                variant="text"
                onClick={() => changeSuperFilter('active')}
                color={filter === 'active' ? 'success' : 'secondary'}
            >active</Button>
            <Button
                variant="text"
                onClick={() => changeSuperFilter('completed')}
                color={filter === 'completed' ? 'success' : 'secondary'}
            >completed</Button>
        </div>
    </div>
})
