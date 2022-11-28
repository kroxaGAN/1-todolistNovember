import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

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
    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {todolistId: todolistId1, title: 'What to learn', filter: "all"},
        {todolistId: todolistId2, title: 'What to buy', filter: "all"},
    ])


    let [tasks, dispatchToTasks] = useReducer(tasksReducer,
        {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: true},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true},
                {id: v1(), title: "ReactJS2", isDone: false},
                {id: v1(), title: "Rest API2", isDone: false},
                {id: v1(), title: "GraphQL2", isDone: true},
            ],
        }
    );

    function removeTask(todolistId:string,taskId: string) {
        dispatchToTasks(removeTaskAC(taskId,todolistId))
    }
    const addTask = (todolistId:string,newTitle: string) => {
        dispatchToTasks(addTaskAC(newTitle,todolistId))
    }
    const changeCheckBox = (todolistId:string,taskId: string, IsDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskId,IsDone,todolistId))
    }
    function changeFilter(todolistId:string,value: FilterValuesType) {
        dispatchToTodolists(ChangeTodolistFilterAC(todolistId,value))
    }
    const removeTodolists=(todolistId:string)=>{
        dispatchToTasks(RemoveTodolistAC(todolistId))
        dispatchToTodolists(RemoveTodolistAC(todolistId))
    }
    const AddTodolistHandler=(title:string)=>{
        const todolistId=v1();
        // const newTodolist:TodolistType={todolistId,title,filter:"all"}
        // setTodolists([newTodolist,...todolists])
        // tasks[todolistId]=[]
        dispatchToTodolists(AddTodolistAC(todolistId,title))
        dispatchToTasks(AddTodolistAC(todolistId,title))
    }
    const editTitleTask=(todolistId:string,taskId: string,title:string)=>{
        dispatchToTasks(changeTaskTitleAC(taskId,title,todolistId))
    }
    const editTodoTitle=(todolistId:string,title:string)=>{
        dispatchToTodolists(ChangeTodolistTitleAC(todolistId,title))
    }

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
                            let tasksForTodolist = tasks[el.todolistId];

                            if (el.filter === "active") {
                                tasksForTodolist = tasks[el.todolistId].filter(t => !t.isDone);
                            }
                            if (el.filter === "completed") {
                                tasksForTodolist = tasks[el.todolistId].filter(t => t.isDone);
                            }
                            return (
                                <Grid item key={el.todolistId}>
                                    <Paper style={{padding:'10px'}}>
                                        <Todolist

                                            todolistId={el.todolistId}
                                            title={el.title}
                                            tasks={tasksForTodolist}
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
