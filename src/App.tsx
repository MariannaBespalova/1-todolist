import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export function getFilteredTasks (allTasks:TaskType[], filterValue: FilterValuesType):TaskType[] {
  let tasksForToDoList = allTasks;
  if(filterValue === "active") {
    tasksForToDoList = allTasks.filter(task => !task.isDone)
  }
  if(filterValue === "completed") {
    tasksForToDoList = allTasks.filter(task => task.isDone)
  }
  return tasksForToDoList;
}

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

  const filteredTasks = getFilteredTasks(tasks, filter)

  const filterTasks = (filterName: FilterValuesType) => {
    setFilter(filterName)
  }

  function addTask(taskTitle:string) {
    const newTask: TaskType = {id: v1(), title:taskTitle, isDone:false}
    const nextState=[newTask,...tasks]
    setTasks(nextState)
  }

  function setTaskStatus (id: string, newIsDone:boolean) {
/*    let task = tasks.find(tasks => tasks.id === id)
    if (task) {
      task.isDone = !task.isDone
      setTasks([...tasks])
    }*/

    const newState = tasks.map(task => task.id === id ? {...task, isDone: newIsDone} : task)
    setTasks(newState)
  }
  return (
    <div className="App">
      <TodoList
        title={"What to learn"}
        tasks={filteredTasks}
        filter={filter}
        removeTask={removeTask}
        filterTasks={filterTasks}
        addTask={addTask}
        changeTaskStatus={setTaskStatus}/>
    </div>
  );
}



export default App;
