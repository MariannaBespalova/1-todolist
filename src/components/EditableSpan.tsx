import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
  oldTitle: string
  callBack: (newTitle:string) => void
  className?: string
}

export function EditableSpan(props:EditableSpanType) {

  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(props.oldTitle)

  const onEditChange = () => {
    setEdit(!edit)
    props.callBack(newTitle)
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.currentTarget.value)
  }
  return (
      edit
        ? <input onChange={onChangeHandler} onBlur={onEditChange} value={newTitle} autoFocus/>
        : <span onDoubleClick={onEditChange} className={props.className}>{props.oldTitle}</span>
  );
}

