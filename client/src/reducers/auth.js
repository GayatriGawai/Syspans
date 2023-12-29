import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    employee: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                token: null,
                loading: false,
            };
        default:
            return state;
    }
}
