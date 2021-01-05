import { v4 as uuidv4 } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
    items : [
        { id: uuidv4(), name:'Eggs' },
        { id: uuidv4(), name:'Milk' },
        { id: uuidv4(), name:'Paneer' },
        { id: uuidv4(), name:'Chicken' }
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS: 
            return {
                ...state
            }
        default: return state;
    }
}