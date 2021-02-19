import React, {useState} from 'react';
import "./CountButton.css" 



// function CountButton(){}
const CountButton = (props) => { //prop is a value passed in a component if want to have different increment by in our countbutton or component.
    console.log(props.incrementBy)

    const [currentCount, setCurrentCount] = useState(0)

    const handleClick = () => {
        
        setCurrentCount(currentCount + props.incrementBy)                
    }


     const buttonStyle = {
         background: props.buttonColor,
         borderRadius: props.borderRadius,

     }

    /* Styling in react : style Object
    const divStyle = {
        color: "blue",
        border:"1px solid black",
        borderRadius:"10px",

    }
    
/*  
    attributes with two names on it will write by camel case like:
        border-radius: 10px

*/



    return (
    <div /*style={divStyle}*/>
        <button style={buttonStyle} onClick={handleClick}>+{props.incrementBy}</button>
        <div className="count-display">{currentCount}</div>
    </div>
    )
}

export default CountButton