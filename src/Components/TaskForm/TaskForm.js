import React, { useEffect, useState } from 'react'
import { TASK_STATES } from '../../models/taskStates'
import { TASK_PRIORITIES } from '../../models/taskPriority'
import Select from 'react-select'
import './TaskForm.css'
import '../../styles/form.css'


const TaskForm = (props) => {

  // Will execute after page loaded (onLoad) 
  useEffect(() => {
    // Get the task id from URL 
    let taskId = props.match.params.taskId
    // Pass the taskId to getTask method to get task information from WebApi
    getTask(taskId);
    getCategories();
  }, []);

  //create task categories state to update the list of categories when get from WebApi
  const [categories, setCategories] = useState(null)

  //create task state
  const [task, setTask] = useState({
    TaskID: null,
    Title: "",
    CategoryID: 0,
    PriorityID: 0,
    StateID: 0,
    DueDate: "",
    PlanedDate: "",
    PriorityID: "",
    EstimatedHours: "",
    RemainingHours: "",
    SpendedHours: "",
    Note: ""
  })


  const onInputChange = (event) => {
    //when any input changed, update task state
    task[event.target.name] = event.target.value
    setTask(task)
  }

  const onSelectChange = (selected, action) => {

    //when any input changed, update task state
    task[action.name] = selected?.value
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

  const getCategories = () => {
    // Get the list the of Categories from WebApi to display in the Category drop down
    fetch('http://localhost:5673/api/Category/GetCategories', {
      method: 'GET',
      headers: {},
    })
      .then(response => response.json()) // Always same
      .then(categoriesFromWebApi => {
        let categoriesOptions = categoriesFromWebApi.map(category => {
          return { value: category.CategoryID, label: category.CategoryTitle }
        })
        setCategories(categoriesOptions);
      })
  }

  const getTask = (id) => {
    // Get the list the of Categories from WebApi to display in the Category drop down
    fetch('http://localhost:5673/api/task/GetTask/' + id, {
      method: 'GET',
      headers: {},
    })
      .then(response => response.json()) // Always same
      .then(taskFromApi => {
        setTask(taskFromApi);
      })
  }

  return (
    <div>
      <h1>Create Task</h1>
      <form className="todo-form">
        <div>
          <label htmlFor="">Task Title:</label>
          <input type='text'
            className="form-input"
            id="title"
            name="Title"
            value={task.Title}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <Select id="categoryID"
            className="form-input select-input"
            name="CategoryID"
            value={categories?.find(x => x.value == task.CategoryID)}
            isClearable="true"
            onChange={onSelectChange}
            options={categories}>
          </Select>
        </div>
        <div>
          <label>State:</label>
          <Select id="stateID"
            className="form-input select-input"
            name="StateID"
            value={TASK_STATES?.find(x => x.value == task.StateID)}
            isClearable="true"
            onChange={onSelectChange}
            options={TASK_STATES}>
          </Select>
        </div>
        <div>
          <label>Priority:</label>
          <Select id="priorityID"
            className="form-input select-input"
            name="PriorityID"
            value={TASK_PRIORITIES.find(x => x.value === task.PriorityID)}
            isClearable="true"
            onChange={onSelectChange}
            options={TASK_PRIORITIES}>
          </Select>
        </div>
        <div>
          <label htmlFor="">Planned:</label>
          <input type='date'
            className="form-input"
            id="planedDate"
            name="PlanedDate"
            value={task.PlanedDate}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Due Date:</label>
          <input type='date'
            className="form-input"
            id="dueDate"
            name="DueDate"
            value={task.DueDate}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Estimated Time:</label>
          <input type='number'
            className="form-input"
            id="estimatedHours"
            name="EstimatedHours"
            value={task.EstimatedHours}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Spend Time:</label>
          <input type='number'
            className="form-input"
            id="spendedHours"
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
            name="RemainingHours"
            value={task.RemainingHours}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Note:</label>
          <textarea rows="7" cols="100"
            className="form-input"
            name="Note"
            id="note"
            value={task.Note}
            onChange={onInputChange} >
          </textarea>
        </div>
      </form>

      <div className="btn-container">
        <button className="btn-cancel">Cancel</button>
        <button onClick={save} className="btn-save">Save</button>
        <button className="btn-delete">Delete</button>
      </div>
    </div>
  )
}

export default TaskForm