import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType
}
export type TasksForTodolistType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {todolistId: todolistId1, title: 'What to learn', filter: "all"},
        {todolistId: todolistId2, title: 'What to buy', filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksForTodolistType>(
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
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(el=>el.id!==taskId)})
    }
    const addTask = (todolistId:string,newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})
    }
    const changeCheckBox = (todolistId:string,taskId: string, IsDone: boolean) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId
                ?{...el, isDone:IsDone}
                :el)})
    }
    function changeFilter(todolistId:string,value: FilterValuesType) {
        setTodolists(todolists.map(el=>el.todolistId===todolistId?{...el,filter:value}:el))
    }
    const removeTodolists=(todolistId:string)=>{
        setTodolists(todolists.filter(el=>el.todolistId!==todolistId))
        delete tasks[todolistId]
    }
    const AddTodolistHandler=(title:string)=>{
        const todolistId=v1();
        const newTodolist:TodolistType={todolistId,title,filter:"all"}
        setTodolists([newTodolist,...todolists])
        tasks[todolistId]=[]
    }
    const editTitleTask=(todolistId:string,taskId: string,title:string)=>{
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id===taskId
            ? {...el,title:title}
                :el
            )})
    }
    const editTodoTitle=(todolistId:string,title:string)=>{
        setTodolists(todolists.map(el=>el.todolistId===todolistId
            ?{...el,title:title}
        :el))
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
                <Grid container spacing={3}>
                    {todolists.map((el) => {
                            let tasksForTodolist = tasks[el.todolistId];

                            if (el.filter === "active") {
                                tasksForTodolist = tasks[el.todolistId].filter(t => !t.isDone);
                            }
                            if (el.filter === "completed") {
                                tasksForTodolist = tasks[el.todolistId].filter(t => t.isDone);
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding:'10px'}}>
                                        <Todolist
                                            key={el.todolistId}
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

export default App;
