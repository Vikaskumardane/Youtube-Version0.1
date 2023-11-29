import React, { createContext, useState, useEffect } from "react";

import { fetchDataFromApi } from "../utils/api";

//crating the context 
export const Context = createContext();

//creating the componetn
export const AppContext = (props) => {
    
    //Creating the states
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    //cratig the useEffect
    useEffect(() => {

         //fetchapi menthod calling
        fetchSelectedCategoryData(selectedCategory);
    }, [selectedCategory]);

    //above fetchSelectedCategoryData method defination
    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            console.log(contents);
            setSearchResults(contents);
            setLoading(false);
        });
    };

    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};