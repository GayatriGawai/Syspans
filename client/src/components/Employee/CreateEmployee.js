import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createEmployee } from '../../actions/employee';
import { connect } from 'react-redux';

const CreateEmployee = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        details: '',
        company: '',
        location: '',
        designation: '',
        skills: '',
    });
    const { name, status, details, company, location, designation, skills } =
        formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        props.createEmployee(formData);
    };
    return <div>CreateEmployee</div>;
};

CreateEmployee.propTypes = {};

export default connect(null, { createEmployee })(CreateEmployee);
