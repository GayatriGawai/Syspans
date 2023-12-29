import {
    GET_EMPLOYEE,
    GET_EMPLOYEES,
    EMPLOYEE_ERROR,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
} from '../actions/types';

const initialState = {
    employee: null,
    loading: true,
    error: {},
};

const employee = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_EMPLOYEE:
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                employee: payload,
                loading: false,
            };
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.employees,
                loading: false,
            };
        case EMPLOYEE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employee: null,
                loading: false,
            };

        default:
            return state;
    }
};

export default employee;
