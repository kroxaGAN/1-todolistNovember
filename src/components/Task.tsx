import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task:TaskType,
    editTitleTask: (taskId: string, title: string) => void,
    removeTask: (taskId: string) => void,
    changeCheckBox: (taskId: string, IsDone: boolean) => void
}

export const Task = memo((props: TaskPropsType) => {
    console.log('Task')
    const updateTaskHandler = useCallback((value: string, taskId: string) => {
        props.editTitleTask( taskId, value)
    }, [props.editTitleTask])
    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }
    const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
        props.changeCheckBox(taskId, event.currentTarget.checked)
    }

    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                onChange={(event) => checkBoxHandler(event, props.task.id)}
            />
            <EditableSpan title={props.task.title} callback={(title) => updateTaskHandler(title, props.task.id)}/>
            <IconButton onClick={() => removeTaskHandler(props.task.id)}>
                <Delete/>
            </IconButton>

        </li>
    )
})
