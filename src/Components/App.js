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
                <Route exact path='/Task/:TaskID' component={TaskForm} />
                <Route exact path='/AddTask' component={TaskForm} />
                <Route exact path='/AddCategory' component={CategoryForm} />
                <Route exact path='/Category/:CategoryID' component={CategoryForm} />
                <Route exact path='/Task/:TaskID/AddCategory' component={CategoryForm} />
                <Route exact path='/Task/:TaskID/Category/:CategoryID' component={CategoryForm} />
            </Switch>
        </div>
    )
}

export default App