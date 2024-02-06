import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Rest Api", isDone: false }
  ])

  let [filter, setFilter] = useState<FilterValuesType>("all")
/*  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]*/

  const removeTask = (id:number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  let tasksForToDoList = tasks;

  if(filter === "active") {
    tasksForToDoList = tasks.filter(task => !task.isDone)
  }
  if(filter === "completed") {
    tasksForToDoList = tasks.filter(task => task.isDone)
  }

  const filterTasks = (filterName: FilterValuesType) => {
      setFilter(filterName)
  }
  return (
    <div className="App">
      <TodoList title={"What to learn"} tasks={tasksForToDoList} removeTask={removeTask} filterTasks={filterTasks}/>
    </div>
  );
}



export default App;
