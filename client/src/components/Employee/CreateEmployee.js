import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createEmployee } from '../../actions/employee';
import { connect } from 'react-redux';

const CreateEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        details: [{ address: '', phone: '', email: '' }], //it is an array of details
        company: '',
        location: '',
        designation: '',
        skills: '',
        education: [
            {
                school: '',
                degree: '',
                fieldofstudy: '',
                description: '',
                from: '',
                to: '',
                current: false,
            },
        ],
        experience: [
            {
                title: '',
                company: '',
                location: '',
                description: '',
                from: '',
                to: '',
                current: false,
            },
        ],
    });
    const {
        name,
        status,
        details,
        company,
        location,
        designation,
        skills,
        education,
        experience,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onDetailChange = (index, field, value) => {
        const newDetails = [...details];
        newDetails[index][field] = value;
        setFormData({ ...formData, details: newDetails });
    };
    const onEducationChange = (index, field, value) => {
        const newEducation = [...education];
        newEducation[index][field] = value;
        setFormData({ ...formData, education: newEducation });
    };

    const onExperienceChange = (index, field, value) => {
        const newExperience = [...experience];
        newExperience[index][field] = value;
        setFormData({ ...formData, experience: newExperience });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createEmployee(formData, navigate));
    };
    return (
        <div>
            <header className="bg-yellow-600 w-fit h-16 py-2">
                <p className="text-center font-semibold text-4xl px-5">
                    <i className="fas fa-user-plus"></i> Add Employee
                </p>
            </header>
            <div className="w-full h-screen p-10 ">
                <form onSubmit={(e) => onSubmit(e)} className="h-full">
                    <label>
                        <i className="fa-asterisk text-red-500 text-xs">
                            Are required fields
                        </i>
                    </label>
                    <div className="mb-2">
                        <label className="font-semibold">
                            Name<i className="fa-asterisk text-red-500"></i>
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                            className="block w-full text-sm h-10 rounded-md bg-gray-100 mt-2"
                            placeholder=" Enter full name"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="font-semibold block mb-2">
                            Status<i className="fa-asterisk text-red-500"></i>
                        </label>
                        <div className="space-x-4 flex">
                            <label className="flex items-center">
                                <input
                                    className="border-black border-2"
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
                                <span className="ml-1 text-sm">Former</span>
                            </label>
                            <label className="flex items-center">
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
                                <span className="ml-1 text-sm">Current</span>
                            </label>
                            <label className="flex items-center">
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
                                <span className="ml-1 text-sm">Trainee</span>
                            </label>
                            <label className="flex items-center">
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
                                <span className="ml-1 text-sm">Intern</span>
                            </label>
                            <label className="flex items-center">
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
                                <span className="ml-1 text-sm">Absconded</span>
                            </label>
                            <label className="flex items-center">
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
                                <span className="ml-1 text-sm">Terminated</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="font-semibold block mb-2">
                            Details
                        </label>
                        {details.map((detail, index) => (
                            <div key={index} className="mb-2">
                                <label className="block font-semibold mb-1 mt-5 text-sm">
                                    Address
                                    <i className="fa-asterisk text-red-500"></i>
                                </label>
                                <input
                                    type="text"
                                    name={`details-${index}-address`}
                                    value={detail.address || ''}
                                    onChange={(e) =>
                                        onDetailChange(
                                            index,
                                            'address',
                                            e.target.value
                                        )
                                    }
                                    className="block bg-gray-100 w-full text-sm h-10 border-gray-300 rounded-md mt-2"
                                    placeholder=" Enter the address"
                                    required
                                />

                                <label className="block mb-1 font-semibold mt-5 text-sm">
                                    Phone
                                    <i className="fa-asterisk text-red-500"></i>
                                </label>
                                <input
                                    type="text"
                                    name={`details-${index}-phone`}
                                    value={detail.phone || ''}
                                    onChange={(e) =>
                                        onDetailChange(
                                            index,
                                            'phone',
                                            e.target.value
                                        )
                                    }
                                    className="block bg-gray-100 w-full text-sm h-10 border-gray-300 rounded-md mt-2"
                                    placeholder=" Enter phone number"
                                    required
                                />

                                <label className="block mb-1 font-semibold mt-5 text-sm">
                                    Email
                                    <i className="fa-asterisk text-red-500"></i>
                                </label>
                                <input
                                    type="text"
                                    name={`details-${index}-email`}
                                    value={detail.email || ''}
                                    onChange={(e) =>
                                        onDetailChange(
                                            index,
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    className="block bg-gray-100 w-full text-sm h-10 border-gray-300 rounded-md mt-2"
                                    placeholder=" Enter email address"
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="font-semibold">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={company}
                            onChange={(e) => onChange(e)}
                            className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                            placeholder=" Comapny name"
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={(e) => onChange(e)}
                            className="block bg-gray-100 w-full mb-5 sm:text-sm h-10 border-gray-300 rounded-md mt-2"
                            placeholder=" e.g Nashik"
                        />
                    </div>
                    <div>
                        <label className="font-semibold ">
                            Designation
                            <i className="fa-asterisk text-red-500"></i>
                        </label>
                        <input
                            type="text"
                            name="designation"
                            value={designation}
                            onChange={(e) => onChange(e)}
                            className="block w-full sm:text-sm h-10 mb-5 border-gray-300 bg-gray-100 rounded-md mt-2"
                            placeholder=" Enter designation"
                        />
                    </div>
                    <div>
                        <label className="font-semibold">
                            Skills<i className="fa-asterisk text-red-500"></i>
                        </label>
                        <input
                            type="text"
                            name="skills"
                            value={skills}
                            onChange={(e) => onChange(e)}
                            className="block w-full sm:text-sm h-10 border-gray-300 bg-gray-100 rounded-md mt-2"
                            placeholder=" Enter skills seperated by comma ( , )"
                        />
                    </div>

                    {/* Education details */}
                    <div className="mb-6">
                        <label className="font-semibold mt-5 block mb-2">
                            Education
                            <i className="fa-asterisk text-red-500"></i>
                        </label>
                        {education.map((edu, index) => (
                            <div key={index} className="mb-2">
                                <div>
                                    <label className="font-semibold text-sm">
                                        School
                                        <i className="fa-asterisk text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="school"
                                        value={edu.school}
                                        onChange={(e) =>
                                            onEducationChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" School name"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        Degree
                                        <i className="fa-asterisk text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={edu.degree}
                                        onChange={(e) =>
                                            onEducationChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" Degree"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        Field of Study
                                        <i className="fa-asterisk text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="fieldofstudy"
                                        value={edu.fieldofstudy}
                                        onChange={(e) =>
                                            onEducationChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" Field of study"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        Description
                                        <i className="fa-asterisk text-red-500"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={edu.description}
                                        onChange={(e) =>
                                            onEducationChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" Description"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        From
                                        <i className="fa-asterisk text-red-500"></i>
                                    </label>
                                    <input
                                        type="date"
                                        name="from"
                                        value={edu.from}
                                        onChange={(e) =>
                                            onEducationChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        to
                                    </label>
                                    <input
                                        type="date"
                                        name="to"
                                        value={edu.to}
                                        onChange={(e) =>
                                            onEducationChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-xs text-gray-700">
                                        Are you currently studying?
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="current"
                                        checked={edu.current}
                                        onChange={() =>
                                            onEducationChange(
                                                index,
                                                'current',
                                                !edu.current
                                            )
                                        }
                                        className="block bg-gray-100 border-gray-300 rounded-md mt-2"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <label className="font-semibold block mb-2">
                        Experience
                    </label>
                    <div className="mb-6">
                        {experience.map((exp, index) => (
                            <div key={index} className="mb-2">
                                <div>
                                    <label className="font-semibold text-sm">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={exp.title}
                                        onChange={(e) =>
                                            onExperienceChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" Title/Designation"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={exp.company}
                                        onChange={(e) =>
                                            onExperienceChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" Company"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={exp.location}
                                        onChange={(e) =>
                                            onExperienceChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" Location"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={exp.description}
                                        onChange={(e) =>
                                            onExperienceChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                        placeholder=" Description"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        From
                                    </label>
                                    <input
                                        type="date"
                                        name="from"
                                        value={exp.from}
                                        onChange={(e) =>
                                            onExperienceChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">
                                        to
                                    </label>
                                    <input
                                        type="date"
                                        name="to"
                                        value={exp.to}
                                        onChange={(e) =>
                                            onExperienceChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-xs text-gray-700">
                                        Are you currently working there?
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="current"
                                        checked={exp.current}
                                        onChange={() =>
                                            onExperienceChange(
                                                index,
                                                'current',
                                                !exp.current
                                            )
                                        }
                                        className="block bg-gray-100 border-gray-300 rounded-md mt-2"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    experience: [...experience, {}],
                                })
                            }
                            className="bg-gray-300 py-2 px-4 rounded"
                        >
                            Add Experience
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="font-semibold bg-green-500 float-right mb-2 mt-5 h-10 w-fit text-center rounded p-2 text-white hover:bg-green-600 hover:scale-105 hover:opacity-100 transition duration-300 ease-in-out"
                    >
                        Add Employee
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
