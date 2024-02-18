import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Rest Api", isDone: false }
  ])

  let [filter, setFilter] = useState<FilterValuesType>("all")
/*  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]*/

  const removeTask = (id:string) => {
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

  function addTask(taskTitle:string) {
    const newTask: TaskType = {id: v1(), title:taskTitle, isDone:false}
    const nextState=[newTask,...tasks]
    setTasks(nextState)
  }
  return (
    <div className="App">
      <TodoList title={"What to learn"} tasks={tasksForToDoList} removeTask={removeTask} filterTasks={filterTasks} addTask={addTask}/>
    </div>
  );
}



export default App;
