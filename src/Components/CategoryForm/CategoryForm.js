import React, { useState, useEffect } from 'react'
import './CategoryForm.css'
import '../../styles/form.css'


const CategoryForm = (props) => {

  //create category state
  const [category, setCategory] = useState({
    CategoryID: null,
    CategoryTitle: "",
    Color: ""
  })

  const onInputChange = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  }


  useEffect(() => {
    // Get the category id from URL 
    let CategoryID = props.match.params.CategoryID;
    // Pass the CategoryID to getCategory method to get category information from WebApi
    if(CategoryID){
      getCategory(CategoryID);
    }
  }, []);

  const getCategory = (id) => {
    //Get the category from WebApi
    fetch('http://localhost:5673/Api/Category/GetCategory/' + id, {
      method: 'GET',
      headers: {},
    })
      .then(response => response.json()) // Always same
      .then(categoryFromApi => {
        setCategory(categoryFromApi);
      })
  }

  const addCategory = (event) => {
    event.preventDefault()
    fetch('http://localhost:5673/Api/Category/AddCategory', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        response.json();
      }).then(categoryFromApi => {
        returnToTaskForm();
      })
  }

  const updateCategory = (event) => {
    event.preventDefault()
    fetch('http://localhost:5673/api/Category/UpdateCategory/' + category.CategoryID, {
      method: 'POST',
      body: JSON.stringify(category),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        response.json();
      }).then(categoryFromApi => {
        returnToTaskForm();
      })
  }

    const deleteCategory = () =>{
      fetch('http://localhost:5673/api/Category/DeleteCategory/' +  category.CategoryID, {
        method: 'POST',
        headers: {},
      })
      .then(response => {
        response.json();
      }).then(categoryFromApi => {
        returnToTaskForm();
      })
    }
  
  const returnToTaskForm = () => {
    // Get taskId from URL
    const taskId = props.match.params.TaskID;
    // Navigate to the task
    props.history.push('/task/'+ taskId)

  }

  return (
    <div>
      <h1>Create Task Category</h1>
      <form className="todo-form">
        <div>
          <label htmlFor="">Category:</label>
          <input type='text'
            className="form-input"
            id="categoryTitle"
            name="CategoryTitle"
            placeholder='Category title'
            value={category.CategoryTitle}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Color:</label>
          <select id="color"
            className="form-input"
            name="Color"
            value={category.Color}
            onChange={onInputChange}>
            <option value="" style={{ color: 'black' }}>Please select a color</option>
            <option value="#f7170059" style={{ color: 'red' }}>red</option>
            <option value="#5dadff59" style={{ color: 'blue' }}>blue</option>
            <option value="#ffb38e" style={{ color: 'orange' }}>Orange</option>
            <option value="#ffb0dc" style={{ color: 'pink' }}>pink</option>
            <option value="#76ff5d59" style={{ color: 'green' }}>Green</option>
            <option value="#8d5fff59#" style={{ color: 'Purple' }}>Purple</option>
            <option value="#fff89f" style={{ color: 'yellow' }}>yellow</option>
          </select>
        </div>
      </form>
      <div className="btn-container">
        <button onClick={returnToTaskForm} className="btn-cancel">Cancel</button>
        { // if CategoryID exist, then display UPDATE button, otherwise display SAVE button 
          (category.CategoryID)
            ? <button onClick={updateCategory} className="btn-save">Update</button>
            : <button onClick={addCategory} className="btn-save">Save</button>
        }
         { // display delete button only if the categoryID is not null
          (category.CategoryID)
            ? <button onClick={deleteCategory} className="btn-delete">Delete</button>
            : ""
        }
      </div>
    </div>
  )
}

export default CategoryForm