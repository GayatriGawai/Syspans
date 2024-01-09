import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateEmployeeProfile, getEmployeeById } from '../../actions/employee';
import Alert from '../layout/Alert';
import moment from 'moment';

const EditEmployee = ({
    employee: { employee, loading },
    getEmployeeById,
    updateEmployeeProfile,
    history,
}) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        details: [{ address: '', phone: '' }],
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
                institution: '',
                degree: '',
                from: '',
                to: '',
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            console.log(47, 'Loading:', loading);
            console.log(48, 'Employee:', employee);
            try {
                await getEmployeeById(id);

                if (
                    !loading &&
                    employee !== undefined &&
                    Object.keys(employee).length > 0
                ) {
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
                            details || !details
                                ? [{ address: '', phone: '' }]
                                : details,
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
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchData();
    }, [loading, getEmployeeById, id, employee]);

    const handleInputChange = (e, field, index, subfield) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => {
            if (type === 'date') {
                const formattedDate = moment(value).format('YYYY-MM-DD');

                return {
                    ...prevData,
                    [field]: prevData[field].map((item, i) =>
                        i === index
                            ? {
                                  ...item,
                                  [subfield]: formattedDate,
                              }
                            : item
                    ),
                };
            }

            if (Array.isArray(prevData[field])) {
                const updatedArray = prevData[field].map((item, i) =>
                    i === index
                        ? {
                              ...item,
                              [subfield]: type === 'checkbox' ? checked : value,
                          }
                        : item
                );

                return {
                    ...prevData,
                    [field]: updatedArray,
                };
            }

            return {
                ...prevData,
                [field]: type === 'checkbox' ? checked : value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updateEmployeeProfile(id, formData, history, true);
    };

    console.log(161, formData);
    console.log('Before conditional check:', employee);

    return (
        <Fragment>
            <div className="bg-white-500">
                <Alert />
                <div className="bg-yellow-600 h-16 md:h-auto py-2 opacity-80 w-full h-16 py-2 fixed top-0">
                    <nav className="text-center font-semibold text-4xl px-5 md:text-xl ">
                        <i className="fas fa-user"></i> Profile of{' '}
                        {employee?.name}
                    </nav>
                </div>
                <div className="mt-8 ml-2 pt-10 md:mt-10">
                    <Link
                        to="/employees"
                        className="rounded inline-block bg-gray-300 py-2 px-5 focus:outline-none hover:opacity-75 transition-opacity"
                    >
                        Back to list
                    </Link>
                </div>
                <div className="w-full h-screen p-10">
                    <form className="form" onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-2">
                            <label className="font-semibold">
                                Name
                                <i className="fa-asterisk text-red-500"></i>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                                className="block w-full text-sm h-10 rounded-md bg-gray-100 mt-2"
                                placeholder={
                                    employee && employee.name
                                        ? employee.name
                                        : ''
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold block mb-2">
                                Status
                                <i className="fa-asterisk text-red-500"></i>
                                <p className="text-xs">{formData.status}</p>
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
                                        <span className="ml-1 text-sm capitalize">
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
                            {formData &&
                                formData.details &&
                                formData.details.length > 0 &&
                                formData.details.map((detail, index) => (
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
                                                    'details',
                                                    index,
                                                    'address'
                                                )
                                            }
                                            className="block bg-gray-100 w-full text-sm h-10 border-gray-300 rounded-md mt-2"
                                            placeholder="Enter the address"
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
                                                    'details',
                                                    index,
                                                    'phone'
                                                )
                                            }
                                            className="block bg-gray-100 w-full text-sm h-10 border-gray-300 rounded-md mt-2"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                ))}
                        </div>

                        <div>
                            <label className="font-semibold">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={(e) =>
                                    handleInputChange(e, 'company')
                                }
                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                placeholder={formData.company}
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={(e) =>
                                    handleInputChange(e, 'location')
                                }
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
                                value={formData.designation}
                                onChange={(e) =>
                                    handleInputChange(e, 'designation')
                                }
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
                                value={formData.skills}
                                onChange={(e) => handleInputChange(e, 'skills')}
                                className="block w-full sm:text-sm h-10 border-gray-300 bg-gray-100 rounded-md mt-2"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="font-semibold mt-5 block mb-2">
                                Education
                                <i className="fa-asterisk text-red-500"></i>
                            </label>
                            {formData &&
                                formData.education &&
                                formData.education.length > 0 &&
                                formData.education.map((edu, index) => (
                                    <div key={index} className="mb-2">
                                        <div>
                                            <label className="font-semibold text-sm">
                                                School
                                                <i className="fa-asterisk text-red-500"></i>
                                            </label>
                                            <input
                                                type="text"
                                                name={`education-${index}-school`}
                                                value={edu.school || ''}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        'education',
                                                        index,
                                                        'school'
                                                    )
                                                }
                                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                placeholder="Enter the institution name"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-semibold text-sm">
                                                Degree
                                                <i className="fa-asterisk text-red-500"></i>
                                            </label>
                                            <input
                                                type="text"
                                                name={`education-${index}-degree`}
                                                value={edu.degree || ''}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        'education',
                                                        index,
                                                        'degree'
                                                    )
                                                }
                                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                placeholder="Enter the degree"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-semibold text-sm">
                                                From
                                                <i className="fa-asterisk text-red-500"></i>
                                            </label>
                                            <input
                                                type="date"
                                                name={`education-${index}-from`}
                                                value={edu.from || ''}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        'education',
                                                        index,
                                                        'from'
                                                    )
                                                }
                                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-semibold text-sm">
                                                To
                                            </label>
                                            <input
                                                type="date"
                                                name={`education-${index}-to`}
                                                value={edu.to || ''}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        'education',
                                                        index,
                                                        'to'
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
                                {formData &&
                                    formData.experience &&
                                    formData.experience.length > 0 &&
                                    formData.experience.map((exp, index) => (
                                        <div key={index} className="mb-2">
                                            <div>
                                                <label className="font-semibold text-sm">
                                                    Title
                                                    <i className="fa-asterisk text-red-500"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`experience-${index}-title`}
                                                    value={exp.title || ''}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            'experience',
                                                            index,
                                                            'title'
                                                        )
                                                    }
                                                    className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    placeholder="Enter the job title"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-semibold text-sm">
                                                    Company
                                                    <i className="fa-asterisk text-red-500"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`experience-${index}-company`}
                                                    value={exp.company || ''}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            'experience',
                                                            index,
                                                            'company'
                                                        )
                                                    }
                                                    className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    placeholder="Enter the company name"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-semibold text-sm">
                                                    Location
                                                    <i className="fa-asterisk text-red-500"></i>
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`experience-${index}-location`}
                                                    value={exp.location || ''}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            'experience',
                                                            index,
                                                            'location'
                                                        )
                                                    }
                                                    className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    placeholder="Enter the location"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-semibold text-sm">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`experience-${index}-description`}
                                                    value={
                                                        exp.description || ''
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            'experience',
                                                            index,
                                                            'description'
                                                        )
                                                    }
                                                    className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                    placeholder="Enter job description"
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
                                                    value={exp.from || ''}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            'experience',
                                                            index,
                                                            'from'
                                                        )
                                                    }
                                                    className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-semibold text-sm">
                                                    To
                                                </label>
                                                <input
                                                    type="date"
                                                    name={`experience-${index}-to`}
                                                    value={exp.to || ''}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            'experience',
                                                            index,
                                                            'to'
                                                        )
                                                    }
                                                    className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                                />
                                            </div>
                                        </div>
                                    ))}
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
    console.log('After conditional check:', employee);
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
