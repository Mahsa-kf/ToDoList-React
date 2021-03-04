import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import { TASK_STATES } from '../../models/taskStates'
import { TASK_PRIORITIES } from '../../models/taskPriority'

import './TaskForm.css'
import '../../styles/form.css'


const TaskForm = (props) => {

  //create task categories state to update the list of categories when get from WebApi
  const [categories, setCategories] = useState(null)

  //create task state
  const [task, setTask] = useState({
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

  // Will execute after page loaded (onLoad) 
  useEffect(() => {
    // Get the task id from URL 
    let TaskID = props.match.params.TaskID;
    // If task id exist, pass the taskId to getTask method to get task information from WebApi
    if (TaskID){
      getTask(TaskID);
    }
    // Get task category to display in the Task Category Drop Down
    getCategories();
  }, []);

  const getTask = (id) => {
    // Get the task from WebApi by taskId from URL
    fetch('http://localhost:5673/api/task/GetTask/' + id, {
      method: 'GET',
      headers: {},
    })
      .then(response => response.json()) // Always same
      .then(taskFromApi => {
        setTask(taskFromApi);
      })
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

  const addTask = (event) => {
    // the default action that belongs to the event will not occur
    event.preventDefault()
    // send the new task information to the webApi to save in the database
    fetch('http://localhost:5673/api/Task/AddTask', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        response.json();
      }).then(taskFromApi => {
        returnToTaskList();
      })
  }

  const updateTask = (event) => {
    // the default action that belongs to the event will not occur
    event.preventDefault()
    // send the new task information to the webApi to save in the database
    fetch('http://localhost:5673/api/Task/UpdateTask/' +  task.TaskID, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        response.json();
      }).then(taskFromApi => {
        returnToTaskList();
      })
  }

  const deleteTask = () => {
    // Get the list the of Categories from WebApi to display in the Category drop down
    fetch('http://localhost:5673/api/task/DeleteTask/' +  task.TaskID, {
      method: 'POST',
      headers: {},
    })
      .then(response => {
        response.json();
      }).then(taskFromApi => {
        returnToTaskList();
      })
  }

  const openEditCategory = () => {
    props.history.push(`/task/${task.TaskID}/category/${task.CategoryID}`)
  }

  const openAddCategory = () => {
    if(task.TaskID){
      props.history.push(`/task/${task.TaskID}/AddCategory`)
    } else {
      props.history.push(`/AddCategory`)
    }
  }

  const returnToTaskList = () => {
    // Return to the root page
    props.history.push('/')
  }

  const onInputChange = (event) => {
    //when any input changed, update task 
    setTask({...task, [event.target.name]: event.target.value})
  }

  const onSelectChange = (selected, action) => {
    //when any input changed, update task 
    setTask({...task, [action.name]: selected?.value})
  }

  return (
    <div>
      <h1>{task.TaskID ? "Edit TAsk" : "Add New Task"}</h1>
      <form className="todo-form">
        <div>
          <label>Task Title:</label>
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
            className="form-input select-input category-input"
            name="CategoryID"
            value={categories?.find(x => x.value == task.CategoryID)}
            isClearable="true"
            onChange={onSelectChange}
            options={categories}>
          </Select>
          <spam className="category-btn-container">
            <i class="category-btn fa fa-plus" title="Add new Category" onClick={openAddCategory}></i>
            <i class="category-btn fa fa-edit" title="Edit Selected Category
            " onClick={openEditCategory}></i>
          </spam>
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
        <button onClick={returnToTaskList} className="btn-cancel">Cancel</button>
        { // if TaskId exist, then display UPDATE button, otherwise display SAVE button 
          (task.TaskID)
            ? <button onClick={ updateTask } className="btn-save">Update</button>
            : <button onClick={ addTask } className="btn-save">Save</button>
        }
        { // display delete button only if the taskId is not null
          (task.TaskID)
            ? <button onClick={deleteTask} className="btn-delete">Delete</button>
            : ""
        }
      </div>
    </div>
  )
}

export default TaskForm