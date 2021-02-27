import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import TaskBox from '../TaskBox/TaskBox'
import './TaskList.css'

const TaskList = (props) => {

    const [taskList, setTaskList] = useState()

    useEffect(() => {
        getTaskList()
    }, []);

    const getTaskList = () => {
        fetch('http://localhost:5673/api/Task/GetTasks', {
            method: 'GET',
            headers: {},
        })
            .then(response => response.json())
            .then(webApiTaskList => {
                setTaskList(webApiTaskList)
            })
    }
    
    return (
        <div>
            <form className="todo-form">
                <div className="filter-container">
                    <label className="filter-label">Task State:</label>
                    <input className="filter-input" 
                        type='text'
                        id="state"
                        name="state"
                        // value={task.Title}
                        // onChange={onInputChange}
                    />
                </div>
                <div className="filter-container">
                    <label className="filter-label">Due Date:</label>
                    <input className="filter-input" 
                        type='date'
                        id="state"
                        name="state"
                        placeholder="Date" 
                                                // value={}
                        // onChange={}
                    />
                </div>
                <div className="filter-container">
                    <label className="filter-label">Planned Date:</label>
                    <input className="filter-input" 
                        type='date'
                        id="state"
                        name="state"
                        // value={task.Title}
                        // onChange={onInputChange}
                    />
                </div>
                <Link to={"/AddTask"}>
                    <i class="add-task-btn fa fa-plus-square" title="Add new Task"></i>
                </Link>
            </form>

            { taskList?.map(task =>
                <TaskBox task={task} />
            )}
        </div>
    )
}

export default TaskList