import React from "react";

type TodoListPropsType = {
  title: string,
  tasks: Array<TaskType>
}

type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}


export function TodoList(props: TodoListPropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task: TaskType) => {
          return (
            <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
          )
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}