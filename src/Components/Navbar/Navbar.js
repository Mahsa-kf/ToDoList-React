import React from 'react';
import { MenuItems } from "./MenuItems";

import logo from "../../images/logo.png";
import './Navbar.css'


const Navbar = (props) => {
    return (
        <nav className="NavbarItems">
            <div className="logo-container">
                <img className="site-logo" src={logo} />
                <h1 className="site-name">Todo List</h1>
            </div>
            <ul className='nav-menu'>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}

            </ul>
            <button class="user">
                <i className="fa fa-user"> </i>
                <span class="logout">Logout</span>
            </button>
        </nav>
    )
}


export default Navbar
