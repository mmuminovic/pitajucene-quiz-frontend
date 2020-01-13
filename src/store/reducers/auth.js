import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';
import isEmpty from '../is-empty';

const initialState = {
    isAuth: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, action.data);
        case actionTypes.SET_CURRENT_USER:
            return updateObject(state, {
                isAuth: !isEmpty(action.payload),
                isAdmin: action.payload.isAdmin || false,
                user: action.payload
            });
        default:
            return state;
    }
}

export default reducer;