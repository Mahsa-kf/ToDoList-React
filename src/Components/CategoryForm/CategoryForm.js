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
              name="color"  
              value={category.color} 
              onChange={onInputChange} 
              style={{ color: category.color }}>
            <option value="" style={{ color: 'black' }}>Please select a color</option>
            <option value="red" style={{ color: 'red' }}>red</option>
            <option value="blue" style={{ color: 'blue' }}>blue</option>
            <option value="orange" style={{ color: 'orange' }}>Orange</option>
            <option value="pink" style={{ color: 'pink' }}>pink</option>
            <option value="green" style={{ color: 'green' }}>Green</option>
            <option value="Purple" style={{ color: 'Purple' }}>Purple</option>
            <option value="yellow" style={{ color: 'yellow' }}>yellow</option>
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