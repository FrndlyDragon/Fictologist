import React, {useState} from 'react'
import '../App.css'
import * as CiIcons from "react-icons/ci"
import * as RxIcons from "react-icons/rx"

function SearchBar() {
    const [searchBarOpen, updateSearchBar] = useState(false);

    function toggleSearchBar() {
        updateSearchBar(!searchBarOpen);
    }

    function searchContent() {

    }

    return (
        <>
            <div className={searchBarOpen ? 'search-bar' : 'search-bar-hide'}>
                <span className='search-bar-exit' onClick={toggleSearchBar}>
                    <RxIcons.RxCross1 />
                </span>

                <input type='text'></input>
                <span className='search-bar-replace' />
                <span className='search-icon' onClick={!searchBarOpen ? toggleSearchBar : searchContent}>
                    <CiIcons.CiSearch />
                </span>
                <div className='page-cover'/>
            </div>
        </>
    )
}

export default SearchBar;