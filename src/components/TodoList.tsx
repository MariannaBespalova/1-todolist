import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, getFilteredTasks} from "../App";

type TodoListPropsType = {
  todoListId:string
  title: string,
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (todoListId:string, id: string) => void
  filterTasks: (todoListId:string, filterName: FilterValuesType) => void
  addTask: (todoListId:string, taskTitle: string) => void
  changeTaskStatus: (todoListId:string, id: string, newIsDone: boolean) => void
  deleteTodoList: (todoListId:string) => void
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
    trimedTitle ? props.addTask(props.todoListId, taskTitle) : setTaskInputError(true)
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

  const onClickDeleteHandler = () => {
    props.deleteTodoList(props.todoListId)
  }

  const isAddTaskEmpty = taskTitle.length === 0 || taskTitle.length > 10;

  const taskTitleInputErrorClass = isInputError ? 'taskTitleInputError' : '';

  function changeCollapsed() {
    setIsCollapsed(!isCollapsed)
  }

  let filteredTasks = props.tasks;
  if (props.filter === "active") {
    filteredTasks = props.tasks.filter(task => !task.isDone)
  }
  if (props.filter === "completed") {
    filteredTasks = props.tasks.filter(task=> task.isDone)
  }

  const activeTasks = props.tasks.filter(el => !el.isDone)

  return (
    <div>
      <div style={{display:"flex", gap:'10px', paddingBottom: '10px'}}>
        <h3 style={{margin: '0'}}>{props.title}</h3>
        <button onClick={onClickDeleteHandler}>Remove</button>
        <button onClick={changeCollapsed}>{isCollapsed ? 'Open' : 'Close'}</button>
      </div>
      {isCollapsed ? <div style={{paddingBottom: '20px'}}>Number of active tasks:
        <span>{activeTasks.length}</span>
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
          {filteredTasks.map((task: TaskType) => {
            let taskClass = ['task']
            if (task.isDone) {
              taskClass = [...taskClass, "task-is-done"]
            }
            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)}/>
                <span className={taskClass.join(' ')}>{task.title}</span>
                <button onClick={() => {
                  props.removeTask(props.todoListId, task.id)
                }}>✖
                </button>
              </li>
            )
          })}
        </ul>

        <div style={{display: "flex", gap: "20px"}}>
          <button className={props.filter === "all" ? "btn-selected" : undefined}
                  onClick={() => props.filterTasks(props.todoListId, "all")}>All
          </button>
          <button className={props.filter === "active" ? "btn-selected" : undefined}
                  onClick={() => props.filterTasks(props.todoListId, "active")}>Active
          </button>
          <button className={props.filter === "completed" ? "btn-selected" : undefined}
                  onClick={() => props.filterTasks(props.todoListId, "completed")}>Completed
          </button>
        </div>
      </div>}
    </div>

  )
}