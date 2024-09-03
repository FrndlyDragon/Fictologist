import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const [state, updateState] = useState(0);

    function testClick() {
        updateState(state + 1);
    }

    return (
        <>
            <IconContext.Provider value={{color: 'undefined'}}>
                <nav className='sidebar'>
                    <ul>
                        <li className='home-selection' onClick={testClick}>
                            <Link to='/' className='home-page'>
                                <AiIcons.AiFillHome /> Home
                            </Link>
                        </li>
                        <li className='test-selection'>
                            <Link to='/test' className='home-page'>
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
