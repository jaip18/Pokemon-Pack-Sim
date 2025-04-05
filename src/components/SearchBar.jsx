import React, { useState } from "react";
import "../css/searchbar.css"

function SearchBar({ onSearch, onReset, isSearching, searchtype }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return; // Prevent empty searches
        onSearch(query); 
    };

    const handleIconClick = () =>{
        if(!query.trim()) return
        onSearch(query)
    }

    return (
        <div className="search-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <span className="search-icon material-symbols-outlined"
                onClick={handleIconClick}
                role="button">search</span>
                <input
                    type="search"
                    placeholder={`Search for ${searchtype}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
            {isSearching && (
                <span 
                className="material-symbols-outlined reset-icon"
                onClick={onReset}
                role="button"
                aria-label="Reset search">
                restart_alt
            </span>
            )}
        </div>
    );
}

export default SearchBar;
