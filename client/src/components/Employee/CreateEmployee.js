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
    return (
        <div>
            <header className="bg-yellow-600 w-fit h-16 py-2">
                <p className="text-center font-semibold text-4xl px-5">
                    <i className="fas fa-user-plus"></i> Add users
                </p>
            </header>
            <div className="w-full h-screen p-10 ">
                <form
                    onSubmit={(e) => onSubmit(e)}
                    className="h-full bg-yellow-700"
                >
                    <div className="mb-2">
                        <label>Name</label>
                        <input
                            className="sm:text-sm border-gray-300 rounded-m"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>

                    <div>
                        <label>Status</label>
                        <div className="space-x-6">
                            <label>
                                <input
                                    className="border-black border-2 "
                                    type="radio"
                                    name="status"
                                    value="former"
                                    checked={status === 'former'}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            status: 'former',
                                        })
                                    }
                                />
                                <span className="ml-1">Former</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="current"
                                    checked={status === 'current'}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            status: 'current',
                                        })
                                    }
                                />
                                <span className="ml-1">Current</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="trainee"
                                    checked={status === 'trainee'}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            status: 'trainee',
                                        })
                                    }
                                />
                                <span className="ml-1">Trainee</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="intern"
                                    checked={status === 'intern'}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            status: 'intern',
                                        })
                                    }
                                />
                                <span className="ml-1">Intern</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="absconded"
                                    checked={status === 'absconded'}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            status: 'absconded',
                                        })
                                    }
                                />
                                <span className="ml-1">Absconded</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="terminated"
                                    checked={status === 'terminated'}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            status: 'terminated',
                                        })
                                    }
                                />
                                <span className="ml-1">Terminated</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label>Details</label>
                        <input
                            name="details"
                            value={details}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div>
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            value={company}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div>
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div>
                        <label>Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={designation}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div>
                        <label>Skills</label>
                        <input
                            type="text"
                            name="skills"
                            value={skills}
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 float-right mb-2 h-10 w-fit text-center rounded p-2 text-white hover:bg-green-600 hover:scale-105 hover:opacity-100 transition duration-300 ease-in-out"
                    >
                        Create Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

CreateEmployee.propTypes = {
    createEmployee: PropTypes.func.isRequired,
};

export default connect(null, { createEmployee })(CreateEmployee);
