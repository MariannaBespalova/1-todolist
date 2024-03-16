import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, getFilteredTasks} from "../App";
import {AddInputForm} from "./AddInputForm";
import {EditableSpan} from "./EditableSpan";

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
  editTask:(todoListId:string, taskId:string, newTitle:string)=>void
  editTodoListTitle: (todoListId:string, newTitle:string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}


export function TodoList(props: TodoListPropsType) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const onClickDeleteHandler = () => {
    props.deleteTodoList(props.todoListId)
  }

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

  const addTaskHandler = (taskTitle:string) => {
    props.addTask(props.todoListId, taskTitle)
  }

  const editTodoListTitleHandler = (newTitle:string) => {
    props.editTodoListTitle(props.todoListId, newTitle)
  }

  const editSpanHandler = (taskId:string, newTitle:string) => {
    props.editTask(props.todoListId, taskId, newTitle)
  }

  return (
    <div>
      <div style={{display:"flex", gap:'10px', paddingBottom: '10px'}}>
       <h3 style={{margin: '0'}}>
         <EditableSpan oldTitle={props.title} callBack={editTodoListTitleHandler} />
       </h3>
        <button onClick={onClickDeleteHandler}>Remove</button>
        <button onClick={changeCollapsed}>{isCollapsed ? 'Open' : 'Close'}</button>
      </div>
      {isCollapsed ? <div style={{paddingBottom: '20px'}}>Number of active tasks:
        <span>{activeTasks.length}</span>
      </div> : null}
      {isCollapsed ? null : <div>
        <AddInputForm onClick={addTaskHandler} />
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
                {/*<span className={taskClass.join(' ')}>{task.title}</span>*/}
                <EditableSpan className={taskClass.join(' ')} callBack={(newTitle)=>editSpanHandler(task.id, newTitle)} oldTitle={task.title}/>
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