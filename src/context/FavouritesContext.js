import React, { createContext, useEffect, useReducer } from 'react';

export const FavouritesContext = createContext();

function favouritesReducer(state, action) {
    switch (action.type) {
        case 'ADD_FAVOURITE':
            return [...state, action.payload];
        case 'REMOVE_FAVOURITE':
            return state.filter(event => event.id !== action.payload);
        case 'SET_FAVOURITES':
            return action.payload;
        default:
            return state;
    }
}

export const FavouritesProvider = ({ children }) => {
    const [favourites, dispatch] = useReducer(favouritesReducer, []);

    useEffect(() => {
        const stored = localStorage.getItem('favourites');
        if (stored) {
            dispatch({ type: 'SET_FAVOURITES', payload: JSON.parse(stored) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addFavourite = event => dispatch({ type: 'ADD_FAVOURITE', payload: event });
    const removeFavourite = id => dispatch({ type: 'REMOVE_FAVOURITE', payload: id });

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
}