import React, { useEffect, useState } from 'react'
import './TaskForm.css'
import '../../styles/form.css'
import Select from 'react-select'


const TaskForm = (props) => {

  // Will execute after page loaded (onLoad) 
  useEffect(() => {
    getCategories();
  }, []);

  //create task state
  const [task, setTask] = useState({})

  //create task categories state to update the list of categories when get from WebApi
  const [categories, setCategories] = useState({})

  const onInputChange = (event) => {
    //when any input changed, update task state
    task[event.target.name] = event.target.value
    setTask(task)
  }

  const onSelectChange = (event) => {
    //when any input changed, update task state
    task[event.label] = event.value
    setTask(task)
  }

  const save = (event) => {
    // the default action that belongs to the event will not occur
    event.preventDefault()
    // send the new task information to the webApi to save in the database
    fetch('http://localhost:5673/api/Task/AddTask', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => setTask(data))
  }

  const getCategories = (event) => {
    // Get the list the of Categories from WebApi to display in the Category drop down
    fetch('http://localhost:5673/api/Category/GetCategories', {
      method: 'GET',
      headers: { },
    })
      .then(response => response.json()) // Always same
      .then(webApiDataCategories => {
         let categoriesOptions = webApiDataCategories.map(category => {
           return {value: category.CategoryID, label: category.CategoryTitle }
         })
         setCategories(categoriesOptions);
      })
  }

  const taskStates  = [
    { value: '1', label: 'To Do' },
    { value: '2', label: 'In Progress' },
    { value: '3', label: 'Done' },
    { value: '4', label: 'Canceled' }
  ]

  const taskPriorities  = [
    { value: 'chocolate', label: 'Critical' },
    { value: 'strawberry', label: 'High' },
    { value: 'vanilla', label: 'Medium' },
    { value: 'vanilla', label: 'Low' }
  ]

  return (
    <div>
      <h1>Create Task</h1>
      <form className="todo-form">
      <div>
          <label htmlFor="">Task Title:</label>
          <input type='text'
            className="form-input"
            id="title" 
            name="title" 
            value={task.taskTitle} 
            onChange={onInputChange} 
          />
        </div>
        <div>
          <label>Category:</label>
          <Select id="categoryID" 
              className="form-input select-input"
              name="categoryID"  
              value={task.categoryID} 
              isClearable="true"
              onChange={onSelectChange}          
              options={categories}>
          </Select>
        </div>
        <div>
          <label>State:</label>
          <Select id="stateID" 
              className="form-input select-input"
              name="stateID"  
              value={task.stateID} 
              isClearable="true"
              onChange={onSelectChange}          
              options={taskStates}>
          </Select>
        </div>
        <div>
          <label>Priority:</label>
          <Select id="priorityID" 
              className="form-input select-input"
              name="priorityID"  
              value={task.priorityID} 
              isClearable="true"
              onChange={onSelectChange}          
              options={taskPriorities}>
          </Select>
        </div>
        <div>
          <label htmlFor="">Planned:</label>
          <input type='date' 
            className="form-input"
            id="planedDate" 
            name="planedDate" 
            value={task.planedDate} 
            onChange={onInputChange} 
          />
        </div>
        <div>
          <label htmlFor="">Due Date:</label>
          <input type='date'
            className="form-input" 
            id="dueDate" 
            name="dueDate" 
            value={task.dueDate} 
            onChange={onInputChange} 
          />
        </div>
        <div>
          <label htmlFor="">Estimated Time:</label>
          <input type='number' 
            className="form-input"
            id="estimatedHours" 
            name="estimatedHours" 
            value={task.estimatedHours} 
            onChange={onInputChange} 
          />
        </div>
        <div>
          <label htmlFor="">Spend Time:</label>
          <input type='number' 
            className="form-input"
            id="SpendedHours" 
            name="SpendedHours" 
            value={task.SpendedHours} 
            onChange={onInputChange} 
          />
        </div>
        <div>
          <label htmlFor="">Remaining:</label>
          <input type='number'
            className="form-input" 
            id="remainingHours" 
            name="remainingHours" 
            value={task.remainingHours} 
            onChange={onInputChange} 
          />
        </div>
        <div>
          <label htmlFor="">Note:</label>          
          <textarea  rows="7" cols="100"
            className="form-input" 
            name="note" 
            id="remainingHours"
            value={task.note} 
            onChange={onInputChange} >
          </textarea>
        </div>
      </form>

      <div className="btn-container">
        <button className="btn-cancel">Cancel</button>
        <button onClick={save}className="btn-save">Save</button>
        <button className="btn-delete">Delete</button>
      </div>
    </div>
  )
}

export default TaskForm