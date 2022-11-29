import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "../Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

type TaskPropsType = {
    task:TaskType,
    todolistId:string
}

export const TaskWithRedux = memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch=useDispatch()

    const updateTaskHandler = useCallback((value: string, taskId: string) => {
        dispatch(changeTaskTitleAC(taskId,value,props.todolistId))
    }, [dispatch,props.todolistId])
    const removeTaskHandler = (taskId: string) => {
        // props.removeTask(taskId)
        dispatch(removeTaskAC(taskId,props.todolistId))

    }
    const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
        // props.changeCheckBox(taskId, event.currentTarget.checked)
        dispatch(changeTaskStatusAC(taskId,event.currentTarget.checked,props.todolistId))
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
