import { createStore } from 'redux';

const initialState = {
    variable: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SYNCHRONIZE':
            return {
                ...state,
                variable: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer)

export default store;