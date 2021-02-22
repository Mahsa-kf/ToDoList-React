import React, { useState } from 'react'
import './CategoryForm.css'
import '../../styles/form.css'


const CategoryForm = (props) => {

  //create category state
  const [category, setCategory] = useState({})

  const onInputChange = (event) => {
    category[event.target.name] = event.target.value
    setCategory(category)
  }

  const save = (event) => {
    event.preventDefault()
    fetch('http://localhost:5673/api/Category/AddCategory', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: { 'Content-Type': 'application/json' },
    })
    // .then(response  => response .json())
    // .then(data  => setCategory(data))
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
            name="categoryTitle" 
            placeholder='Category title' 
            value={category.categoryTitle} 
            onChange={onInputChange} 
          />
        </div>
        <div>
          <label>Color:</label>
          <select id="color" 
              className="form-input"
              name="color"  
              value={category.color} 
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
        <button className="btn-cancel">Cancel</button>
        <button onClick={save} className="btn-save">Save</button>
        <button className="btn-delete">Delete</button>
      </div>
    </div>
  )
}

export default CategoryForm