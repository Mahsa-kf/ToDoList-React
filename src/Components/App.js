import React from "react"
import { Route, Switch} from 'react-router-dom'

import CategoryForm from "./CategoryForm/CategoryForm.js"
import TaskForm from "./TaskForm/TaskForm.js"
import TaskList from "./TaskList/TaskList.js"


const App = () => {  

    return (
        <div className="main">
            <Switch>
                <Route exact path='/' component={TaskList} />
                <Route exact path='/Task/:taskId' component={TaskForm} />
                <Route exact path='/newTask' component={TaskForm} />
                <Route exact path='/newCategory' component={CategoryForm} />
            </Switch>
        </div>
    )
}

export default App