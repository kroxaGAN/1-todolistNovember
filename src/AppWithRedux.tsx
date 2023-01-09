import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType
}
export type TasksForTodolistType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType,TodolistType[]>(state=>state.todolists)
    const tasks=useSelector<AppRootStateType,TasksForTodolistType>(state=>state.tasks)
    const dispatch=useDispatch()

    const removeTask= useCallback ((todolistId:string,taskId: string)=> {
        dispatch(removeTaskAC(taskId,todolistId))
    },[dispatch])
    const changeCheckBox = useCallback ((todolistId:string,taskId: string, IsDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId,IsDone,todolistId))
    },[dispatch])
    const changeFilter= useCallback ((todolistId:string,value: FilterValuesType)=> {
        dispatch(ChangeTodolistFilterAC(todolistId,value))
    },[dispatch])
    const removeTodolists= useCallback ((todolistId:string)=>{
        dispatch(RemoveTodolistAC(todolistId))
    },[dispatch])
    const editTitleTask= useCallback ((todolistId:string,taskId: string,title:string)=>{
        dispatch(changeTaskTitleAC(taskId,title,todolistId))
    },[dispatch])
    const editTodoTitle= useCallback ((todolistId:string,title:string)=>{
        dispatch(ChangeTodolistTitleAC(todolistId,title))
    },[dispatch])
    const AddTodolistHandler= useCallback((title:string)=>{
        const todolistId=v1();
        dispatch(AddTodolistAC(todolistId,title))
    },[dispatch])
    const addTask = useCallback((todolistId:string,newTitle: string) => {
        dispatch(addTaskAC(newTitle,todolistId))
    },[dispatch])

    return (
        <div >

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm title={'Add todo'} callback={AddTodolistHandler}/>
                </Grid>
                <Grid container spacing={3} >
                    {todolists.map((el:TodolistType) => {

                            return (
                                <Grid item key={el.todolistId}>
                                    <Paper style={{padding:'10px'}}>
                                        <Todolist

                                            todolistId={el.todolistId}
                                            title={el.title}
                                            tasks={tasks[el.todolistId]}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeCheckBox={changeCheckBox}
                                            filter={el.filter}
                                            removeTodolists={removeTodolists}
                                            editTitleTask={editTitleTask}
                                            editTodoTitle={editTodoTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
