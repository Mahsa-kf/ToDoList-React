import React from "react"
import ReactDom from "react-dom"
import App from "./Components/App"
import { BrowserRouter} from 'react-router-dom'

import "./styles/global.css"
import 'font-awesome/css/font-awesome.min.css';

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById("root"))