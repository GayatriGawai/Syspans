import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Admin_dashboard from './components/auth/admin_dashboard';
import Employee from './components/Employee';
import { Provider } from 'react-redux';
import store from './store';
import EditEmployee from './components/Employee/EditEmployee';
import GetEmployee from './components/Employee/GetEmployee';
import DeleteEmployee from './components/Employee/DeleteEmployee';
import CreateEmployee from './components/Employee/CreateEmployee';
import Alert from './components/layout/Alert';
import './App.css';

const App = () => (
    // Provide always have an object
    <Provider store={store}>
        <Fragment>
            <Alert />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/admin_dashboard"
                        element={<Admin_dashboard />}
                    />
                    <Route path="/employees" element={<Employee />} />
                    {/* // Used the element instead of the component*/}
                    <Route path="/employees/add" element={<CreateEmployee />} />
                    <Route path="/employee/get/:id" element={<GetEmployee />} />
                    <Route
                        path="/employee/edit/:id"
                        element={<EditEmployee />}
                    />
                    <Route path="/employee/:id" component={DeleteEmployee} />
                </Routes>
            </Router>
        </Fragment>
    </Provider>
);

export default App;
