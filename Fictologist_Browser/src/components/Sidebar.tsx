import React, {useState, useEffect} from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import Submenu from './Submenu';
import '../App.css';

function Sidebar() {
    const [state, UpdateState] = useState(0);
    const [numMenus, SetNum] = useState(0);
    const [fileNames, SetNamesArr] = useState<string[]>([]); //Save file name into arr to pass to submenus

    //Test implementation 
    const [testArray, setArray] = useState<React.ReactElement[]>([]);
    const [isLoading, UpdateLoading] = useState(true);
    const arrMenusTest: React.ReactElement[] = [];

    const testObj = {
        title: "Test",
        content: "Howdy"
    }

    //Test function to see if buttons are registering
    function TestClick() {
        UpdateState(state + 1);
        var data = JSON.stringify(testObj);
        //window.ipcRenderer.invoke('write-json', data, "testFile", "../Fictologist/src/data");
    }

    useEffect(() => {
        //window.ipcRenderer.invoke('get-files', "../Fictologist/src/data").then((files) => {
        //    SetNamesArr(files);
        //    SetNum(files.length);
        //})
        
        //if (isLoading) {
        //    TestSidebarSetup();
        //}
        //else {
        //    console.log(testArray)
        //    console.log(isLoading)
        //}
    }, [])

    //Sidebar setup that uses numMenus state. useEffect runs every time the page rerenders which sees if files changed. If number of files changed, so will the number of loop iterations.
    function SidebarSetup() { 
        const arrMenus = [];
        
        for (let i = 0; i < numMenus; i++) {
            console.log(fileNames)
            var itemId = i.toString();
            arrMenus.push(<Submenu key={itemId} fileName={fileNames[i]}/>);
        }

        return arrMenus;
    }

    //This version does not update automatically as it requires the Loading state or the Array state to change but allowing this will actually store the array of submenus.
    //function TestSidebarSetup() {
    //    var numFiles = 0;
//
    //    window.ipcRenderer.invoke('get-files', "../Fictologist/src/data").then((files) => {
    //        numFiles = files;
//
    //        for (let i = 0; i < files; i++) {
    //            console.log("Hello")
    //            var itemId = i.toString();
    //            arrMenusTest.push(<Submenu key={itemId} fileName={itemId}/>);
    //        }
//
    //        console.log(arrMenusTest)
    //        setArray(arrMenusTest);
    //        UpdateLoading(false)
    //    })
    //}

    return (
        <>
            <IconContext.Provider value={{color: 'undefined'}}>
                <div>
                    <div className='project-name'>
                        <p>Logo Here</p>
                    </div>
                    <nav className='sidebar'>
                        <ul className='sidebar-items'>
                            <li className='nav-text' onClick={TestClick}>
                                <Link to='/'>
                                    Home
                                </Link>
                            </li>

                            {
                                SidebarSetup().map((item) => {
                                    console.log(item)
                                    return (
                                        item
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar
