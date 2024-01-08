import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateEmployeeProfile, getEmployeeById } from '../../actions/employee';
import Alert from '../layout/Alert';
import employeeSelectors from '../../selectors/employeeSelectors';
import moment from 'moment';

const EditEmployee = ({
    employee: { employee, loading },
    getEmployeeById,
    updateEmployeeProfile,
    history,
}) => {
    const employeeData = useSelector(employeeSelectors.employeeData);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        details: { address: '', phone: '', email: '' },
        company: '',
        location: '',
        designation: '',
        skills: '',
        experience: [
            {
                title: '',
                company: '',
                location: '',
                from: '',
                to: '',
                current: false,
                description: '',
            },
        ],
        education: [
            {
                school: '',
                degree: '',
                fieldofstudy: '',
                from: '',
                to: '',
                current: false,
                description: '',
            },
        ],
    });
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);

    useEffect(() => {
        getEmployeeById(id);

        if (!loading && employee) {
            const {
                name,
                status,
                details,
                company,
                location,
                designation,
                skills,
                experience,
                education,
            } = employee;

            setFormData({
                name: loading || !name ? '' : name,
                status: loading || !status ? '' : status,
                details:
                    details || !details ? { address: '', phone: '' } : details,
                company: loading || !company ? '' : company,
                location: loading || !location ? '' : location,
                designation: loading || !designation ? '' : designation,
                skills: loading || !skills ? '' : skills.join(', '),
                experience:
                    loading || !experience
                        ? [
                              {
                                  title: '',
                                  company: '',
                                  location: '',
                                  from: '',
                                  to: '',
                                  current: false,
                                  description: '',
                              },
                          ]
                        : experience,
                education:
                    loading || !education
                        ? [
                              {
                                  school: '',
                                  degree: '',
                                  fieldofstudy: '',
                                  from: '',
                                  to: '',
                                  current: false,
                                  description: '',
                              },
                          ]
                        : education,
            });
        }
    }, [loading, getEmployeeById, id, employee]);

    const handleInputChange = (e, field, index) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => {
            const updatedData = { ...prevData };

            if (type === 'checkbox') {
                updatedData[field][index] = {
                    ...updatedData[field][index],
                    [name]: checked,
                };
            } else {
                updatedData[field] = { ...updatedData[field], [name]: value };
            }

            return updatedData;
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updateEmployeeProfile(id, formData, history, true);
    };

    return (
        <Fragment>
            <div className="bg-white-500">
                <Alert />
                <div className="bg-yellow-600 h-16 md:h-auto py-2 opacity-80 w-full h-16 py-2 fixed top-0">
                    <nav className="text-center font-semibold text-4xl px-5 md:text-xl ">
                        <i className="fas fa-user"></i> Profile of{' '}
                        {employeeData.name}
                    </nav>
                </div>
                <div className="mt-5 ml-2 pt-10">
                    <Link
                        to="/employees"
                        className="rounded inline-block bg-gray-300 py-2 px-5 focus:outline-none hover:opacity-75 transition-opacity"
                    >
                        Back to list
                    </Link>
                </div>
                <div className="w-full h-screen p-10 ">
                    <form className="form" onSubmit={(e) => onSubmit(e)}>
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
                                value={employeeData.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                                className="block w-full text-sm h-10 rounded-md bg-gray-100 mt-2"
                                placeholder={formData.name}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="font-semibold block mb-2">
                                Status
                                <i className="fa-asterisk text-red-500"></i>{' '}
                                <p className="text-xs">{formData.status}</p>{' '}
                            </label>
                            <div className="space-x-4 flex">
                                {[
                                    'former',
                                    'current',
                                    'trainee',
                                    'intern',
                                    'absconded',
                                    'terminated',
                                ].map((status) => (
                                    <label
                                        key={status}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={status}
                                            checked={formData.status === status}
                                            onChange={(e) =>
                                                handleInputChange(e, 'status')
                                            }
                                        />
                                        <span className="ml-1 text-sm captalize">
                                            {status}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="font-semibold block mb-2">
                                Details
                            </label>
                            {employeeData &&
                                employeeData.details &&
                                employeeData.details.length > 0 &&
                                employeeData.details.map((detail, index) => (
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
                                                handleInputChange(
                                                    e,
                                                    `details-${index}-address`
                                                )
                                            }
                                            className="block bg-gray-100 w-full text-sm h-10 border-gray-300 rounded-md mt-2"
                                            placeholder=" Enter the address"
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
                                                handleInputChange(
                                                    e,
                                                    `details-${index}-phone`
                                                )
                                            }
                                            className="block bg-gray-100 w-full text-sm h-10 border-gray-300 rounded-md mt-2"
                                            placeholder=" Enter phone number"
                                        />
                                    </div>
                                ))}
                        </div>

                        <div>
                            <label className="font-semibold">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={employeeData.company}
                                onChange={(e) => handleInputChange(e)}
                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                placeholder={employeeData.company}
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={employeeData.location}
                                onChange={(e) => handleInputChange(e)}
                                className="block bg-gray-100 w-full mb-5 sm:text-sm h-10 border-gray-300 rounded-md mt-2"
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
                                value={employeeData.designation}
                                onChange={(e) => handleInputChange(e)}
                                className="block w-full sm:text-sm h-10 mb-5 border-gray-300 bg-gray-100 rounded-md mt-2"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">
                                Skills
                                <i className="fa-asterisk text-red-500"></i>
                            </label>
                            <input
                                type="text"
                                name="skills"
                                value={employeeData.skills}
                                onChange={(e) => handleInputChange(e)}
                                className="block w-full sm:text-sm h-10 border-gray-300 bg-gray-100 rounded-md mt-2"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="font-semibold mt-5 block mb-2">
                                Education
                                <i className="fa-asterisk text-red-500"></i>
                            </label>
                            {employeeData &&
                                employeeData.education &&
                                employeeData.education.length > 0 &&
                                employeeData.education.map((edu, index) => (
                                    <div key={index} className="mb-2">
                                        {/* ... other input fields ... */}
                                        <div>
                                            <label className="font-semibold text-sm">
                                                From
                                                <i className="fa-asterisk text-red-500"></i>
                                            </label>
                                            <input
                                                type="date"
                                                name={`education-${index}-from`}
                                                value={edu.from}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        `education-${index}-from`
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
                                                name={`education-${index}-to`}
                                                value={edu.to}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        `education-${index}-to`
                                                    )
                                                }
                                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="form-group">
                            <label className="font-semibold block mb-2">
                                Experience
                            </label>
                            <div className="mb-6">
                                {employeeData &&
                                    employeeData.experience &&
                                    employeeData.experience.length > 0 &&
                                    employeeData.experience.map(
                                        (exp, index) => (
                                            <div key={index} className="mb-2">
                                                <div>
                                                    <label className="font-semibold text-sm">
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={`experience-${index}-title`}
                                                        value={exp.title}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                'title'
                                                            )
                                                        }
                                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="font-semibold text-sm">
                                                        Company
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={`experience-${index}-company`}
                                                        value={exp.company}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                'company'
                                                            )
                                                        }
                                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="font-semibold text-sm">
                                                        Location
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={`experience-${index}-location`}
                                                        value={exp.location}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                'location'
                                                            )
                                                        }
                                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="font-semibold text-sm">
                                                        Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={`experience-${index}-description`}
                                                        value={exp.description}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                'description'
                                                            )
                                                        }
                                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="font-semibold text-sm">
                                                        From
                                                        <i className="fa-asterisk text-red-500"></i>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name={`experience-${index}-from`}
                                                        value={exp.from}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                'from'
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
                                                        name={`experience-${index}-to`}
                                                        value={exp.to}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e,
                                                                'to'
                                                            )
                                                        }
                                                        className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>

                        <input
                            type="submit"
                            className="bg-green-500 float-right mb-2 h-10 w-fit text-center rounded p-2 text-white hover:bg-gree
                        n-600 hover:scale-105 hover:opacity-100 transition duration-300 ease-in-out"
                        />
                        <Link
                            to={`/employee/get/${id}`}
                            className="bg-red-500 float-left mb-2 h-10 w-fit text-center rounded p-2 text-white hover:bg-gree
                        n-600 hover:scale-105 hover:opacity-100 transition duration-300 ease-in-out"
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

EditEmployee.propTypes = {
    updateEmployeeProfile: PropTypes.func.isRequired,
    getEmployeeById: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    employee: state.employees.employee,
});

export default connect(mapStateToProps, {
    updateEmployeeProfile,
    getEmployeeById,
})(EditEmployee);
