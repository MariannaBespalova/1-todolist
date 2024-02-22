import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, getFilteredTasks} from "../App";

type TodoListPropsType = {
  title: string,
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (id: string) => void
  filterTasks: (filterName: FilterValuesType) => void
  addTask: (taskTitle: string) => void
  changeTaskStatus: (id: string, newIsDone: boolean) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}


export function TodoList(props: TodoListPropsType) {
  const [taskTitle, setTaskTitle] = useState('')
  const [isInputError, setTaskInputError] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

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

  function addTaskOnPress(e: KeyboardEvent<HTMLInputElement>) {
    if (!isInputError) {
      e.key === 'Enter' && addTask()
    }
  }
  const activeTasks = getFilteredTasks(props.tasks, 'active')
  const isAddTaskEmpty = taskTitle.length === 0 || taskTitle.length > 10;

  const taskTitleInputErrorClass = isInputError ? 'taskTitleInputError' : '';

  function changeCollapsed() {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div>
      <div style={{display:"flex", gap:'10px', paddingBottom: '10px'}}>
        <h3 style={{margin: '0'}}>{props.title}</h3>
        <button onClick={changeCollapsed}>{isCollapsed ? 'Open' : 'Close'}</button>
      </div>
      {isCollapsed ? <div style={{paddingBottom: '20px'}}>Number of active tasks:
        <span> {activeTasks.length}</span>
      </div> : null}
      {isCollapsed ? null : <div>
        <div>
          <input
            value={taskTitle}
            onChange={onChangeHandler}
            placeholder={"Enter max 10 charts"}
            className={taskTitleInputErrorClass}
            onKeyDown={addTaskOnPress}/>
          <button onClick={addTask} disabled={isAddTaskEmpty}>+</button>
          {isInputError && <div style={{color: 'red'}}>Not valid</div>}
        </div>
        <ul>
          {props.tasks.map((task: TaskType) => {
            let taskClass = ['task']
            if (task.isDone) {
              taskClass = [...taskClass, "task-is-done"]
            }
            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked)}/>
                <span className={taskClass.join(' ')}>{task.title}</span>
                <button onClick={() => {
                  props.removeTask(task.id)
                }}>✖
                </button>
              </li>
            )
          })}
        </ul>

        <div style={{display: "flex", gap: "20px"}}>
          <button className={props.filter === "all" ? "btn-selected" : undefined}
                  onClick={() => props.filterTasks("all")}>All
          </button>
          <button className={props.filter === "active" ? "btn-selected" : undefined}
                  onClick={() => props.filterTasks("active")}>Active
          </button>
          <button className={props.filter === "completed" ? "btn-selected" : undefined}
                  onClick={() => props.filterTasks("completed")}>Completed
          </button>
        </div>
      </div>}
    </div>

  )
}