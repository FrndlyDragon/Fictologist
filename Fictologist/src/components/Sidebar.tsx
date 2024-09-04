import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import '../App.css';

function Sidebar() {
    const [state, updateState] = useState(0);

    //Test function to see if buttons are registering
    function testClick() {
        updateState(state + 1);
    }

    return (
        <>
            <IconContext.Provider value={{color: 'undefined'}}>
                <nav className='sidebar'>
                    <ul className='sidebar-items'>
                        <li className='project-name'>
                            Project Name
                        </li>
                        <li className='nav-text' onClick={testClick}>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <Link to='/template'>
                                Test
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar
