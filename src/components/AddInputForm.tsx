import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

  const buttonStyle ={
    maxWidth: "39px",
    minHeight: "39px",
    minWidth: "39px",
    maxHeight: "39px",
    backgroundColor:''
  }

  return (
    <div>
      <TextField
        error={isInputError}
        value={title}
        onChange={onChangeHandler}
        placeholder={"Enter max 10 charts"}
        className={taskTitleInputErrorClass}
        onKeyDown={addTaskOnPress}
        id="outlined-basic"
        label="Type smth..."
        size="small"
        variant="outlined" />
      <Button size="small" variant="contained" onClick={addTask} disabled={isAddTaskEmpty}
              style={buttonStyle}>+</Button>
      {isInputError && <div style={{color: 'red'}}>Not valid</div>}
    </div>
  );
};
