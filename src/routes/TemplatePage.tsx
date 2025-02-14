import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../App.css'

function populateData(dataObj: string) {
    var parsedData = JSON.parse(dataObj);

    return parsedData;
}

function getFile(fileNum: string) {
    var fileID = Number(fileNum);

    //window.ipcRenderer.invoke('read-json')
}

function Template() {
    const location = useLocation();
    const state = location.state;
    //const data = populateData(state);

    useEffect(() => {
        console.log("Page Opened");
    })
    
    return (
        <>
            <div className='template'>
                <h1>Title</h1>
            </div>
        </>
    );
}

export default Template;