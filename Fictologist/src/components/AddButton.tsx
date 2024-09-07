import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import * as AiIcons from "react-icons/ai"

function AddButton() {
    return (
        <>
            <div className='add-button'>
                <Link to='add'>
                    <button><AiIcons.AiOutlinePlus/></button>
                </Link>
            </div>
        </>
    )
}

export default AddButton;