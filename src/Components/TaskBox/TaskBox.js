import React from 'react'
import { TASK_STATES } from '../../models/taskStates'
import { TASK_PRIORITIES } from '../../models/taskPriority'
import './TaskBox.css'

const TaskBox = (props) => {
   
    const task = props.task;

    return (
        <div>
            <div className="task-box" style={{ backgroundColor: task.Category.Color }}>
                <div className="row"> 
                    <div className="inline">
                        <h4>{ task?.Title }</h4>
                    </div>
                    <i className="inline fa fa-flag" style={{ color: TASK_PRIORITIES.find(p => p.value === task.PriorityID)?.color }}></i>

                    <div className="inline float-right">{task?.Category?.CategoryTitle}</div>
                </div>

                <div className="row">
                    <div className="task-col-1">
                        Planned: {task?.PlanedDate}
                    </div>
                    <div className="task-col-2">
                        Estimated: {task?.EstimatedHours}
                    </div>
                </div>
                <div className="row">
                    <div className="task-col-1">
                        Due: {task?.DueDate}
                    </div>
                    <div className="task-col-2">
                        Remaining: {task?.RemainingHours}
                    </div>
                    <div className="task-col-3">
                        <span className="float-right">
                           { TASK_STATES.find(t => t.value === task?.StateID)?.label }
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TaskBox