import React, { useState, useEffect } from 'react'
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
            {/* <TaskBox task={tasks[0]}/>
            <TaskBox task={tasks[1]}/> */}

            { taskList?.map(task =>
                <TaskBox task={task} />
            )}
        </div>
    )
}

export default TaskList