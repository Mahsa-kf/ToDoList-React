import React from "react"
import CategoryForm from "./CategoryForm/CategoryForm.js"
import TaskForm from "./TaskForm/TaskForm.js"
import TaskList from "./TaskList/TaskList.js"
const App = () => {  

    return (
        <div className="main"> 
                       
            {/* { <CategoryForm/> } */}
            {/* { <TaskForm/> }  */}
            <TaskList/>
        </div>                                                       
    )
}

export default App