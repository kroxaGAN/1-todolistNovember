import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const tasks = [
        {id: 1, title: "HTML&CSS1", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "RJS", isDone: true},
        {id: 5, title: "RctJS", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks}/>
        </div>
    );
}

export default App;
