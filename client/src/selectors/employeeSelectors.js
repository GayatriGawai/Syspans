import { createSelector } from '@reduxjs/toolkit';
const selectRaw = (state) => state.employees;
const employeeData = createSelector(
    [selectRaw],
    (employees) => employees.employee
);

const employeeSelectors = { employeeData };
export default employeeSelectors;
