import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

function AddPage() {
    const navigate = useNavigate();

    var dataObj = {
        title: '',
        content: '',
        tags: ''
    }

    function ParseForm() {
        var titleElem = document.getElementById('title-add')! as HTMLInputElement;
        var titleData = titleElem.value;
        var contentElem = document.getElementById('content-add')! as HTMLInputElement;
        var contentData = contentElem.value;

        dataObj.title = titleData;
        dataObj.content = contentData;
        var data = JSON.stringify(dataObj);

        console.log(data);
        console.log(titleData);
        navigate("/template");
    }

    return (
        <>
            <div className='add-page'>
                <h1>New Page</h1>
                <form className='add-form' id='add-form'>
                    <label htmlFor='title-add' className='title-label'> Page Title </label>
                    <input className='title-add' id='title-add'/>
                    <label htmlFor='content-add' className='content-label'> Content </label>
                    <textarea className='content-add' id='content-add' rows={20}/>
                    <button type='button' className='submit' onClick={ParseForm}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddPage