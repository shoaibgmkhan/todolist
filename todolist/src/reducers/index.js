import { combineReducers } from "redux";

const INITIAL_STATE = {
    token: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'AUTH_UPDATED':
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer
});