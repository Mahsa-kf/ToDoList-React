import React, { useState } from 'react'
import './TaskForm.css'
import '../../styles/form.css'


const TaskForm = (props) => {

  //create task state
  const [task, setTask] = useState({})

  const onInputChange = (event) => {
    task[event.target.name] = event.target.value
    setTask(task)
  }

  const save = (event) => {
    event.preventDefault()
    fetch('http://localhost:5673/api/Task/AddTask', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' },
    })
    // .then(json => setTask(json))
  }




  return (
    <div>
      <h1>Create Task</h1>
      <form className="todo-form">

      
      </form>
      <div className="btn-container">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-save">Save</button>
        <button className="btn-delete">Delete</button>
      </div>
    </div>
  )
}

export default TaskForm