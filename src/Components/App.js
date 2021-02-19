import React from "react"
import CountButton from './CountButton/CountButton.js'
import SearchBar from './SearchBar/SearchBar.js'

const App = () => {  
    return (
        <div>
            {/* using multiple countButton we copy pase and if want to give different value using prop to set seperate here */}
            {/* <CountButton  incrementBy={1} buttonColor={"yellow"} borderRadius={"20px"}/>
            <CountButton incrementBy={5} buttonColor={"red"} borderRadius={"5px"}/>             */}
            <SearchBar/>

        </div>
    )
}

export default App