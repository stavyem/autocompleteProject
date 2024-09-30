import React, { useState, useEffect } from 'react';
import fetchProfiles from '../dataService'; // Import the data fetching function
import '../styles/Autocomplete.css';
import searchIcon from '../assets/search.png';

// Function to fetch and set suggestions based on query
const fetchSuggestions = async (input, setSuggestions) => {
    const result = await fetchProfiles(input);
    console.log("result:", result);
    setSuggestions(result);
};

const Autocomplete = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [showAll, setShowAll] = useState(false);

    // UseEffect to fetch suggestions when query changes
    useEffect(() => {
        if (isFocused){
            if (query.length === 1){
                setSuggestions([])
            }
            else{
                fetchSuggestions(query, setSuggestions);
            }
        }
    }, [query, isFocused]);

    // Log the updated suggestions
    useEffect(() => {
        console.log("Updated suggestions:", suggestions); // This logs the suggestions after they are updated
    }, [suggestions]);

    // Function to handle search button click
    const handleSearchClick = () => {
        setShowAll(true);
        if (query.length <= 1 || suggestions.length === 0) {
            fetchSuggestions('', setSuggestions); // Fetch all data
        }
    };

    // Handle "Enter" key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    // Function to highlight matched query in text
    const highlightMatch = (text) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="highlighted">{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <div className="autocomplete-container">
            {/* Logo */}
            <div className="logo">
                <img src="/Deloitte-Logo.png" alt="Logo" />
            </div>


            {/* Title above the search bar */}
            <h1>LOOKING FOR AN EMPLOYEE ?</h1>
            <h2>Click on the search bar to learn our suggestions</h2>
            
            {/* Wrapping the search bar and dropdown */}
            <div className="search-wrapper">
                {/* Search bar and button */}
                <div className="search-container">
                    <input
                        className="search-input"
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowAll(false); // Reset the "showAll" when typing
                        }}
                        onKeyDown={handleKeyPress}
                        placeholder="Search..."
                        onFocus={() => {
                            setIsFocused(true);
                            setShowAll(false);
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                        }}
                    />

                    <button className="search-button" onClick={handleSearchClick}>
                        <img src={searchIcon} alt="Search"/>
                    </button>
                </div>

                {!showAll && isFocused && suggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {query.length === 0
                            ? suggestions.map((profile) => (
                                <li key={profile.Name}>
                                    <img src={profile.ImageUrl} alt={profile.Name} />
                                    <div className="text-container">
                                        <p>{highlightMatch(profile.Name)}</p>
                                        <p>{highlightMatch(profile.WorkTitle)}</p>
                                    </div>
                                </li>
                            ))
                            : suggestions.slice(0, 3).map((profile) => (
                                <li key={profile.Name}>
                                    <img src={profile.ImageUrl} alt={profile.Name} />
                                    <div className="text-container">
                                        <p>{highlightMatch(profile.Name)}</p>
                                        <p>{highlightMatch(profile.WorkTitle)}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>

            {showAll && (
                <div className="search-results">
                    <ul>
                        {suggestions.map((profile) => (
                            <li key={profile.Name}>
                                <img src={profile.ImageUrl} alt={profile.Name} />
                                <div className="text-container">
                                    <p>{profile.Name}</p>
                                    <p>{profile.WorkTitle}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Autocomplete;
