import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

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
    const dispatch=useDispatch()


    const AddTodolistHandler= useCallback((title:string)=>{
        const todolistId=v1();
        dispatch(AddTodolistAC(todolistId,title))
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
                                        {/*<Todolist*/}
                                        {/*    todolistId={el.todolistId}*/}
                                        {/*    title={el.title}*/}
                                        {/*    tasks={tasks[el.todolistId]}*/}
                                        {/*    removeTask={removeTask}*/}
                                        {/*    changeFilter={changeFilter}*/}
                                        {/*    addTask={addTask}*/}
                                        {/*    changeCheckBox={changeCheckBox}*/}
                                        {/*    filter={el.filter}*/}
                                        {/*    removeTodolists={removeTodolists}*/}
                                        {/*    editTitleTask={editTitleTask}*/}
                                        {/*    editTodoTitle={editTodoTitle}*/}
                                        {/*/>*/}
                                        <TodolistWithRedux todolist={el}/>
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
