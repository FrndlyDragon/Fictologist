import React, {useState} from "react";
import { Link } from "react-router-dom";
import * as RiIcons from "react-icons/ri";

function Submenu() {
    const [isSubOpen, updateSubOpen] = useState(false);
    const subToggle = true;

    function toggleSub() {
        updateSubOpen(!isSubOpen);
    }

    return (
        <>
            {subToggle ? 
                <> 
                    <li className='nav-text' onClick={toggleSub}>
                        <div className="menu-text">
                            Test
                            <div>
                                {isSubOpen ? <RiIcons.RiArrowUpSFill/> : <RiIcons.RiArrowDownSFill/>}
                            </div>
                        </div>
                    </li>
                    {isSubOpen ? 
                        <>
                            <li className='sub-text'>
                                <Link to='template'>
                                    Sub
                                </Link>
                            </li>
                        </>
                        : null
                    }
                </>
                : 
                <li className='nav-text'>
                    <Link to='template'>
                        Test
                    </Link>
                </li>
            }            
        </>
    )
}

export default Submenu;