import React, {useState} from "react";
import {FilterValuesType} from "../App";
import {AddInputForm} from "./AddInputForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

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
      <div style={{display:"flex", gap:'10px', paddingBottom: '10px', alignItems:'center'}}>
       <h3 style={{margin: '0'}}>
         <EditableSpan oldTitle={props.title} callBack={editTodoListTitleHandler} />
       </h3>
        <IconButton aria-label="delete" onClick={onClickDeleteHandler}>
          <DeleteIcon />
        </IconButton>
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
                <EditableSpan className={taskClass.join(' ')} callBack={(newTitle)=>editSpanHandler(task.id, newTitle)} oldTitle={task.title}/>
                <IconButton aria-label="delete" onClick={() => {props.removeTask(props.todoListId, task.id)}}>
                  <DeleteIcon />
                </IconButton>
              </li>
            )
          })}
        </ul>

        <div style={{display: "flex", gap: "20px"}}>
          <Button variant={props.filter === "all" ? "contained" : "outlined"} color="primary"
                  onClick={() => props.filterTasks(props.todoListId, "all")}>
            All
          </Button>
          <Button variant={props.filter === "active" ? "contained" : "outlined"} color="success"
                  onClick={() => props.filterTasks(props.todoListId, "active")}>
            Active
          </Button>

          <Button variant={props.filter === "completed" ? "contained" : "outlined"} color="secondary"
                  onClick={() => props.filterTasks(props.todoListId, "completed")}>
            Completed
          </Button>
        </div>
      </div>}
    </div>

  )
}