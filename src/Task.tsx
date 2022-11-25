import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo} from "react";
import {TaskType} from "./Todolist";


type TaskProps={
    task:TaskType,
    removeTask:(taskId: string)=>void
    editTitleTask:(value: string, taskId: string)=>void
    changeCheckBox:(isDone:boolean, taskId: string)=>void
}

export const Task= memo(({task,removeTask,editTitleTask,changeCheckBox}:TaskProps)=>{
    console.log("Task")
    const checkBoxChan = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
        changeCheckBox(event.currentTarget.checked,taskId)
    }
    const updateTaskHandler = (value: string, taskId: string) => {
        editTitleTask(taskId, value)
    }
    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId)
    }

    return(
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                onChange={(event) => checkBoxChan(event, task.id)}
            />
            <EditableSpan title={task.title} callback={(title) => updateTaskHandler(title, task.id)}/>
            <IconButton onClick={() => removeTaskHandler(task.id)}>
                <Delete/>
            </IconButton>

        </li>
    )
})
