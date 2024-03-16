import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddInputFormProps = {
  onClick: (title:string) => void
}

export const AddInputForm = (props:AddInputFormProps) => {

  const [title, setTitle] = useState('')
  const [isInputError, setTaskInputError] = useState(false)
  const taskTitleInputErrorClass = isInputError ? 'taskTitleInputError' : '';

  const isAddTaskEmpty = title.length === 0 || title.length > 10;

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value)
    title.length > 10 ? setTaskInputError(true) : setTaskInputError(false)
  }

  function addTaskOnPress(e: KeyboardEvent<HTMLInputElement>) {
    if (!isInputError) {
      e.key === 'Enter' && addTask()
    }
  }

  function addTask() {
    let newTrimedTitle = title.trim()
    newTrimedTitle ? props.onClick(newTrimedTitle) : setTaskInputError(true)
    setTitle('')
    setTaskInputError(false)
  }

  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        placeholder={"Enter max 10 charts"}
        className={taskTitleInputErrorClass}
        onKeyDown={addTaskOnPress}/>
      <button onClick={addTask} disabled={isAddTaskEmpty}>+</button>
      {isInputError && <div style={{color: 'red'}}>Not valid</div>}
    </div>
  );
};
