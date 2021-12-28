import { createStore } from "@reduxjs/toolkit";

const initialState = {
    sortType: 'letter',
    revertOrder: false,
}

function reducer(state = initialState, action){
    switch(action.type){
        case 'sortSelected':
            return { ...state, sortType: action.payload }    
        case 'revertOrderSelected':
            return { ...state, revertOrder: action.payload }                      
        default:
            return state;
    }
}

export const store = createStore(reducer);
