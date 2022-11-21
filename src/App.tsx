import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType
}
export type TasksForTodolistType = {
    [key: string]: [TaskType]
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {todolistId: todolistId1, title: 'What to learn', filter: "all"},
        {todolistId: todolistId2, title: 'What to buy', filter: "all"},
    ])

    let [tasks, setTasks] = useState(
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
    const changeCheckBox = (taskId: string, IsDone: boolean) => {
        // setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: IsDone} : el))
    }
    function changeFilter(todolistId:string,value: FilterValuesType) {
        setTodolists(todolists.map(el=>el.todolistId===todolistId?{...el,filter:value}:el))
    }

    return (
        <div className="App">
            {
                todolists.map((el) => {
                    let tasksForTodolist = tasks[el.todolistId];

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.todolistId].filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.todolistId].filter(t => t.isDone);
                    }
                    return (
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
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
