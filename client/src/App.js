import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Admin_dashboard from './components/auth/admin_dashboard';

const App = () => (
    <Fragment>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/admin_dashboard"
                    element={<Admin_dashboard />}
                ></Route>
            </Routes>
        </Router>
    </Fragment>
);

export default App;
