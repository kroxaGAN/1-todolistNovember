import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {ButtonUniver} from "./components/ButtonUniver";
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {IconButton} from "@mui/material";
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

export function Todolist(props: PropsType) {

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }
    const changeSuperFilter = (value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    }
    const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
        props.changeCheckBox(props.todolistId, taskId, event.currentTarget.checked)
    }
    const rewmoveTodoHandler = () => {
        props.removeTodolists(props.todolistId)
    }
    const addTaskCompHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const updateTaskHandler = (value: string, taskId: string) => {
        props.editTitleTask(props.todolistId, taskId, value)
    }
    const updateTodoTitleHandler = (title: string) => {
        props.editTodoTitle(props.todolistId, title)
    }

    return <div>
        <EditableSpan title={props.title} callback={updateTodoTitleHandler}/>
        <IconButton onClick={rewmoveTodoHandler}>
            <Delete/>
        </IconButton>

        <AddItemForm title={'ADDTASK'} callback={addTaskCompHandler}/>
        <ul>
            {
                props.tasks.map(
                    (t) => {
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
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
            <ButtonUniver
                title={"all"}
                callback={() => changeSuperFilter('all')}
                filter={props.filter}
            />
            <ButtonUniver title={"active"} callback={() => changeSuperFilter('active')} filter={props.filter}/>
            <ButtonUniver title={"completed"} callback={() => changeSuperFilter('completed')}
                          filter={props.filter}/>


        </div>
    </div>
}
