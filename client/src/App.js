import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Admin_dashboard from './components/auth/admin_dashboard';
import Employee from './components/Employee';

const App = () => (
    <Fragment>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin_dashboard" element={<Admin_dashboard />} />
                <Route path="/employees" element={<Employee />} />
            </Routes>
        </Router>
    </Fragment>
);

export default App;
