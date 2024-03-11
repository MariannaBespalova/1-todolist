import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type AllTasks = {
  [key:string]:TaskType[]
}

type TodoList = {
  todoListId: string
  title: string
  filter: FilterValuesType
}
export function getFilteredTasks(todoListId:string, allTasks: AllTasks, filterValue: FilterValuesType): TaskType[] {
  let tasksForToDoList = allTasks[todoListId];
  if (filterValue === "active") {
    tasksForToDoList = allTasks[todoListId].filter((task: { isDone: any; }) => !task.isDone)
  }
  if (filterValue === "completed") {
    tasksForToDoList = allTasks[todoListId].filter((task: { isDone: any; }) => task.isDone)
  }
  return tasksForToDoList;
}

function App() {
  let todoListId1 = v1()
  let todoListId2 = v1()
  let [todoLists, setTodoLists] = useState<TodoList[]>([
    {todoListId: todoListId1, title: 'What to buy', filter: 'all'},
    {todoListId: todoListId2, title: 'What to learn', filter: 'all'}
  ])

  let [tasks, setTasks] = useState({
    [todoListId1]: [{id: v1(), title: "Bread", isDone: true},
      {id: v1(), title: "Salt", isDone: true},
      {id: v1(), title: "Cheese", isDone: false},
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "Soap", isDone: false}],

    [todoListId2]: [{id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
      {id: v1(), title: "Rest Api", isDone: false}],
  })
/*  let [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
    {id: v1(), title: "Rest Api", isDone: false}
  ])*/

/*  let [filter, setFilter] = useState<FilterValuesType>("all")*/

  const removeTask = (todoListId:string, id: string) => {
    setTasks({...tasks, [todoListId]:tasks[todoListId].filter(el=>el.id!==id)})
  }

  const filterTasks = (todoListId:string, filter:FilterValuesType) => {
    setTodoLists(todoLists.map(el=> el.todoListId === todoListId ? {...el, filter} : el))
  }

  function addTask(todoListId:string, taskTitle: string) {
    const taskId = v1()
    const newTask = {id: taskId, title: taskTitle, isDone: false}
    setTasks({...tasks, [todoListId]:[newTask, ...tasks[todoListId]] })
/*    const newTask: TaskType = {id: v1(), title: taskTitle, isDone: false}
    const nextState = [newTask, ...tasks]
    setTasks(nextState)*/
  }

  function setTaskStatus(id: string, newIsDone: boolean) {
    /*    let task = tasks.find(tasks => tasks.id === id)
        if (task) {
          task.isDone = !task.isDone
          setTasks([...tasks])
        }*/

/*    const newState = tasks.map(task => task.id === id ? {...task, isDone: newIsDone} : task)*/
/*    setTasks(newState)*/
  }

  return (
    <div className="App">

      {todoLists.map(el => {
        let filteredTasks = tasks[el.todoListId];
        if (el.filter === "active") {
          filteredTasks = tasks[el.todoListId].filter(task => !task.isDone)
        }
        if (el.filter === "completed") {
          filteredTasks = tasks[el.todoListId].filter(task=> task.isDone)
        }

        return (
          <TodoList
            key={el.todoListId}
            todoListId={el.todoListId}
            title={el.title}
            tasks={filteredTasks}
            filter={el.filter}
            removeTask={removeTask}
            filterTasks={filterTasks}
            addTask={addTask}
            changeTaskStatus={setTaskStatus}/>)
      })}

    </div>
  );
}


export default App;
