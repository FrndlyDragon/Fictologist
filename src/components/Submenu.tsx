import React, {useState} from "react";
import { Link } from "react-router-dom";
import * as RiIcons from "react-icons/ri";

function Submenu({key, fileName} : {key: string, fileName: string}) {
    const [isSubOpen, updateSubOpen] = useState(false);
    const subToggle = true;

    function toggleSub() {
        updateSubOpen(!isSubOpen);
        console.log(fileName)
    }

    function reloadMenu() {
        
    }
    
    function openPage() {
    
    }

    function getPageData(temp: string) {
        var dataObj = {
            title: "Test",
            content: "Howdy"
        }

        return dataObj;
    }

    return (
        <>
            {subToggle ? 
                <> 
                    <li className='nav-text' onClick={toggleSub} id={key}>
                        <div className="menu-text">
                            Test
                            <div>
                                {isSubOpen ? <RiIcons.RiArrowUpSFill/> : <RiIcons.RiArrowDownSFill/>}
                            </div>
                        </div>
                    </li>
                    {isSubOpen ? 
                        <>
                            <li className='sub-text' id={key}>
                                <Link to='template'>
                                    Sub
                                </Link>
                            </li>
                        </>
                        : null
                    }
                </>
                : 
                <li className='nav-text' id={key}>
                    <Link to='template'>
                        Test
                    </Link>
                </li>
            }            
        </>
    )
}

export default Submenu;