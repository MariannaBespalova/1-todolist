import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
  title: string,
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  filterTasks: (filterName: FilterValuesType) => void
  addTask: (taskTitle: string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}


export function TodoList(props: TodoListPropsType) {
  const [taskTitle, setTaskTitle] = useState('')
  const [isInputError, setTaskInputError] = useState(false)

  function addTask() {
    let trimedTitle = taskTitle.trim()
    trimedTitle ? props.addTask(taskTitle) : setTaskInputError(true)
    setTaskTitle('')
    setTaskInputError(false)
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.currentTarget.value)
    taskTitle.length > 10 ? setTaskInputError(true) : setTaskInputError(false)
  }

  function addTaskOnPress (e:KeyboardEvent<HTMLInputElement>) {
    if(!isInputError) {
      e.key === 'Enter' && addTask()
    }
  }

  const isAddTaskEmpty = taskTitle.length === 0 || taskTitle.length > 10;

  const taskTitleInputErrorClass = isInputError ? 'taskTitleInputError' : '';




  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeHandler}
          placeholder={"Enter max 10 charts"}
          className={taskTitleInputErrorClass}
          onKeyDown={addTaskOnPress}/>
        <button onClick={addTask} disabled={isAddTaskEmpty}>+</button>
        {isInputError && <div style={{color:'red'}}>Not valid</div>}
      </div>
      <ul>
        {props.tasks.map((task: TaskType) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone}/>
              <span>{task.title}</span>
              <button onClick={() => {
                props.removeTask(task.id)
              }}>✖
              </button>
            </li>
          )
        })}
      </ul>

      <div style={{display: "flex", gap: "20px"}}>
        <button onClick={() => props.filterTasks("all")}>All</button>
        <button onClick={() => props.filterTasks("active")}>Active</button>
        <button onClick={() => props.filterTasks("completed")}>Completed</button>
      </div>
    </div>
  )
}