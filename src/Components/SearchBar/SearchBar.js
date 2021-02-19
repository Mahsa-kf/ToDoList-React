import React, { useState } from "react"
import "./SearchBar.css"


const SearchBar = () => {  
    const [searchValue, setSearchValue] = useState("the search value")
   
    const handleInputChange = (event) => {
     setSearchValue(event.target.value) 
    }

    return (                 
        <div>
            <input type="text" value={searchValue} onChange={handleInputChange} />
            {searchValue}
        </div>       
    )
}

export default SearchBar