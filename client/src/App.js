import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Admin_dashboard from './components/auth/admin_dashboard';
import Employee from './components/Employee';
import { Provider } from 'react-redux';
import store from './store';
import EditEmployee from './components/Employee/EditEmployee';
import EmpDetails from './components/Employee/EmpDetails';
import DeleteEmployee from './components/Employee/DeleteEmployee';
import './App.css';

const App = () => (
    // Provide always have an object
    <Provider store={store}>
        <Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/admin_dashboard"
                        element={<Admin_dashboard />}
                    />
                    <Route path="/employees" element={<Employee />} />
                    {/* <Route path="/employee/:id" component={EmpDetails} /> */}
                    <Route path="/employee/edit/:id" component={EditEmployee} />
                    <Route path="/employee/:id" component={DeleteEmployee} />
                </Routes>
            </Router>
        </Fragment>
    </Provider>
);

export default App;
