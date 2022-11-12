import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterType='all' | 'active' | 'completed'

function App() {
    const [tasks,setTasks]=useState<TaskType[]>([
        {id: 1, title: "HTML&CSS1", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "RJS", isDone: true},
        {id: 5, title: "RctJS", isDone: false}
    ])
    const [emptyTasks,setEmptyTasks]=useState<TaskType[]>([])
    const [nameButton,setNameButton]=useState<'Clean'|'Update'>('Clean')
    const removeTask=(taskId:number)=>{
        setTasks(tasks.filter((el)=>el.id!==taskId))
    }
    const cleanTasks=()=>{
        setNameButton("Update")
        setEmptyTasks(tasks)
        setTasks(emptyTasks)
    }
    // const [filter,setFilter]=useState<FilterType>('all')
    // const filteredTasks=(value:FilterType)=>{
    //     setFilter(value)
    // }
    // let filterTasks=tasks
    // if (filter === 'active'){
    //     filterTasks=tasks.filter(el=>!el.isDone)
    // }
    // if (filter === 'completed'){
    //     filterTasks=tasks.filter(el=>el.isDone)
    // }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasks}
                removeTask={removeTask}
                // filteredTasks={filteredTasks}
                cleanTasks={cleanTasks}
                nameButton={nameButton}
            />
        </div>
    );
}

export default App;
