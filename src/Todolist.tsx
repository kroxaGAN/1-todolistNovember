import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material'
import {TaskWithRedux} from "./components/TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, newTitle: string) => void
    changeCheckBox: (todolistId: string, taskId: string, IsDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolists: (todolistId: string) => void
    editTitleTask: (todolistId: string, taskId: string, title: string) => void
    editTodoTitle: (todolistId: string, title: string) => void
}

export const Todolist= memo((props: PropsType)=> {
    // console.log('Todolist')

    const removeTaskHandler = useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    },[props.removeTask,props.todolistId])
    const changeSuperFilter = useCallback((value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    },[props.changeFilter,props.todolistId])
    const checkBoxHandler = useCallback((taskId: string, IsDone: boolean) => {
        props.changeCheckBox(props.todolistId, taskId, IsDone)
    },[props.changeCheckBox,props.todolistId])
    const rewmoveTodoHandler = () => {
        props.removeTodolists(props.todolistId)
    }
    const addTaskCompHandler = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    },[props.addTask, props.todolistId])
    const updateTaskHandler = useCallback((value: string, taskId: string) => {
        props.editTitleTask(props.todolistId, taskId, value)
    },[props.editTitleTask,props.todolistId])
    const updateTodoTitleHandler = useCallback((title: string) => {
        props.editTodoTitle(props.todolistId, title)
    },[props.editTodoTitle,props.todolistId])

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div>
        <EditableSpan title={props.title} callback={updateTodoTitleHandler}/>
        <IconButton onClick={rewmoveTodoHandler}>
            <Delete/>
        </IconButton>

        <AddItemForm title={'ADDTASK'} callback={addTaskCompHandler}/>
        <ul>
            {
                tasksForTodolist.map(
                    (t) => {
                        return (
                            <>
                                <TaskWithRedux task={t} todolistId={props.todolistId}/>
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
                color={props.filter === 'all'? 'success' : 'secondary'}
            >all</Button>
            <Button
                variant="text"
                onClick={() => changeSuperFilter('active')}
                color={props.filter === 'active' ? 'success' : 'secondary'}
            >active</Button>
            <Button
                variant="text"
                onClick={() => changeSuperFilter('completed')}
                color={props.filter === 'completed' ? 'success' : 'secondary'}
            >completed</Button>
        </div>
    </div>
})
