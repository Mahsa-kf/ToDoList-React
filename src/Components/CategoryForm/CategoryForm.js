import React, { useState} from 'react'

export default function CategoryForm() {

    const [input, setInput] = useState('');

    return (
      <form className="todo-form">
          <input type='text' placeholder='Add a todo' value={input} name='text' className= 'todo-input'/>
          <button className='todo-button'>Add to do</button>
      </form>
      
    )
}

export default Form