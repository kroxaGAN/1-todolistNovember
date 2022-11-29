import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material'


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

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }
    const changeSuperFilter = useCallback((value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    },[props.changeFilter,props.todolistId])
    const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
        props.changeCheckBox(props.todolistId, taskId, event.currentTarget.checked)
    }
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
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={(event) => checkBoxHandler(event, t.id)}
                                />
                                <EditableSpan title={t.title} callback={(title) => updateTaskHandler(title, t.id)}/>
                                <IconButton onClick={() => removeTaskHandler(t.id)}>
                                    <Delete/>
                                </IconButton>

                            </li>
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
