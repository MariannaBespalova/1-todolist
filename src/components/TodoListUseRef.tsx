import React, {useRef} from "react";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
  title: string,
  tasks: Array<TaskType>
  removeTask: (id:string) => void
  filterTasks: (filterName: FilterValuesType) =>void
  addTask: (taskTitle:string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}


export function TodoList(props: TodoListPropsType) {
  const taskTitleInput = useRef<HTMLInputElement>(null)
  function addTask () {
    if (taskTitleInput.current){
      props.addTask(taskTitleInput.current.value)
      taskTitleInput.current.value = '';
    }
    
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input ref={taskTitleInput}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task: TaskType) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone}/>
              <span>{task.title}</span>
              <button onClick={() => {props.removeTask(task.id)}}>✖</button>
            </li>
          )
        })}
      </ul>

      <div style={{display:"flex", gap: "20px"}}>
        <button onClick={()=>props.filterTasks("all")}>All</button>
        <button onClick={()=>props.filterTasks("active")}>Active</button>
        <button onClick={()=>props.filterTasks("completed")}>Completed</button>
      </div>
    </div>
  )
}