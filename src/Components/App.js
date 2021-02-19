import React, {useState, useEffect} from "react"
import CountButton from './CountButton/CountButton.js'
import SearchBar from './SearchBar/SearchBar.js'



const App = () => {  
    const [productsState, setProductsState] = useState([])

    // useEffect(() => {

    //     fetch('https://fakestoreapi.com/products')
    //         .then((res) => res.json())
    //         .then((productsArray) => {
    //            const newProductsState = productsArray.map((product) => {
    //            return product.title
    //         })
    //         setProductsState(newProductsState)
    //     })
    // }, [])



    //     setTimeout(() => {
    //         setProductsState([               
    //                 "tooth paste",
    //                 "tooth brush",
    //                 "mouth wash",
    //                 "dental floss",
    //                 "mouth guard",                
    //              ])
    //             },2000)
    //  }, [])
     
     const hasProducts = productsState.length > 0

    return (
        <div> 
                       
            { <SearchBar products = {productsState} /> }       
        </div>        
                                       
              
    )
}

export default App