import React, {useState, useEffect} from "react"
import CategoryForm from "./CategoryForm/CategoryForm.js"
import TaskForm from "./TaskForm/TaskForm.js"

const App = () => {  

    return (
        <div className="main"> 
                       
            {/* { <CategoryForm/> } */}
            { <TaskForm/> } 
        </div>                                                       
    )
}

export default App