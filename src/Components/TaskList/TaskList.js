import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

import { TASK_STATES } from '../../models/taskStates'

import TaskBox from '../TaskBox/TaskBox'
import './TaskList.css'

const TaskList = (props) => {

    const [taskList, setTaskList] = useState();
    const [filteredTaskList, setFilteredTaskList] = useState();
    const [categories, setCategories] = useState(null);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        getTaskList()
        // Get task category to display in the Task Category Drop Down
        getCategories();
    }, []);

    const getTaskList = () => {
        fetch('http://localhost:5673/api/Task/GetTasks', {
            method: 'GET',
            headers: {},
        })
            .then(response => response.json())
            .then(webApiTaskList => {
                setTaskList(webApiTaskList);
                setFilteredTaskList(webApiTaskList);
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

      const onSelectChange = (selected, action) => {
        //when any filter changed, update filters
        var newFilters = {...filters, [action.name]: selected?.value} ;
        applyFilters(newFilters);
      }

      const onInputChange = (event) => {
        //when any filter changed, update filters
        var newFilters = {...filters, [event.target.name]: event.target.value} ;
        applyFilters(newFilters);
      }

      const applyFilters = (newFilters) => {
        setFilters(newFilters)

        let newTaskList = taskList;
        for (var filterKey in newFilters) {
            if (newFilters[filterKey]){
                newTaskList = newTaskList.filter(t => t[filterKey] == newFilters[filterKey])
            }
        }
        setFilteredTaskList(newTaskList)
      }
    
    
    return (
        <div>
            <form className="todo-filter-form">
                <div className="filter-container filter-select-container">
                    <label className="filter-label">Task Category:</label>
                    <Select id="categoryID"
                        className="filter-input"
                        name="CategoryID"
                        // value={categories?.find(x => x.value == task.CategoryID)}
                        isClearable="true"
                        onChange={onSelectChange}
                        options={categories}>
                    </Select>
                </div>
                <div className="filter-container filter-select-container">
                    <label className="filter-label">Task State:</label>
                    <Select id="stateID"
                        className="filter-input"
                        name="StateID"
                        // value={TASK_STATES?.find(x => x.value == task.StateID)}
                        isClearable="true"
                        onChange={onSelectChange}
                        options={TASK_STATES}>
                    </Select>
                </div>
                <div className="filter-container due-date-input-container">
                    <label className="filter-label">Due Date:</label>
                    <input className="filter-input" 
                        type='date'
                        id="DueDate"
                        name="DueDate"
                        placeholder="DueDate" 
                      //  value={filters.DueDate}
                        onChange={onInputChange}
                    />
                </div>
                <div className="filter-container">
                    <label className="filter-label">Planned Date:</label>
                    <input className="filter-input" 
                        type='date'
                        id="PlanedDate"
                        name="PlanedDate"
                        value={filters.PlanedDate}
                        onChange={onInputChange}
                    />
                </div>
                <Link to={"/AddTask"}>
                    <i className="add-task-btn fa fa-plus-square" title="Add new Task"></i>
                </Link>
            </form>

            { filteredTaskList?.map(task =>
                <TaskBox task={task} />
            )}
        </div>
    )
}

export default TaskList