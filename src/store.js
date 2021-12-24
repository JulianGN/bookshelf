import { createStore } from "@reduxjs/toolkit";

const initialState = {
    sortType: 'letter',
    firstShelfSorted: [],
    lastShelfSorted: [],
    revertOrder: false,
}

function reducer(state = initialState, action){
    switch(action.type){
        case 'sortSelected':
            return { ...state, sortType: action.payload }
        case 'firstShelfChanged':
            return { ...state, firstShelfSorted: action.payload }
        case 'lastShelfChanged':
            return { ...state, lastShelfSorted: action.payload }       
        case 'revertOrderSelected':
            return { ...state, revertOrder: action.payload }                      
        default:
            return state;
    }
}

export const store = createStore(reducer);
