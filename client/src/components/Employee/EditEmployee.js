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
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onDetailsChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            details: {
                ...prevData.details,
                [name]: value,
            },
        }));
    };

    const onExperienceChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            experience: prevData.experience.map((exp, i) =>
                i === index ? { ...exp, [name]: value } : exp
            ),
        }));
    };

    const onEducationChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            education: prevData.education.map((edu, i) =>
                i === index ? { ...edu, [name]: value } : edu
            ),
        }));
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
                                value={name}
                                onChange={(e) => onChange(e)}
                                className="block w-full text-sm h-10 rounded-md bg-gray-100 mt-2"
                                placeholder={employeeData.name}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold block mb-2">
                                Status
                                <i className="fa-asterisk text-red-500"></i>{' '}
                                <p className="text-xs">{employeeData.status}</p>{' '}
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
                                    <span className="ml-1 text-sm">
                                        Current
                                    </span>
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
                                    <span className="ml-1 text-sm">
                                        Trainee
                                    </span>
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
                                    <span className="ml-1 text-sm">
                                        Absconded
                                    </span>
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
                                    <span className="ml-1 text-sm">
                                        Terminated
                                    </span>
                                </label>
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
                                                onDetailsChange(
                                                    index,
                                                    'address',
                                                    e.target.value
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
                                                onDetailsChange(
                                                    index,
                                                    'phone',
                                                    e.target.value
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
                                value={company}
                                onChange={(e) => onChange(e)}
                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                placeholder={employeeData.company}
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
                                placeholder={employeeData.location}
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
                                placeholder={employeeData.designation}
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
                                value={skills}
                                onChange={(e) => onChange(e)}
                                className="block w-full sm:text-sm h-10 border-gray-300 bg-gray-100 rounded-md mt-2"
                                placeholder={employeeData.skills}
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
                                            />
                                        </div>
                                        <p>
                                            From:{' '}
                                            {moment(edu.from).format(
                                                'MM/DD/YYYY'
                                            )}{' '}
                                            To:{' '}
                                            {edu.current
                                                ? 'Present'
                                                : moment(edu.to).format(
                                                      'MM/DD/YYYY'
                                                  )}
                                        </p>
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
                                    </div>
                                ))}
                        </div>

                        <div className="form-group">
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
                                                    onExperienceChange(index, e)
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
                                                name="company"
                                                value={exp.company}
                                                onChange={(e) =>
                                                    onExperienceChange(index, e)
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
                                                name="location"
                                                value={exp.location}
                                                onChange={(e) =>
                                                    onExperienceChange(index, e)
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
                                                name="description"
                                                value={exp.description}
                                                onChange={(e) =>
                                                    onExperienceChange(index, e)
                                                }
                                                className="block w-full text-sm h-10 mb-5 bg-gray-100 border-gray-300 rounded-md mt-2"
                                            />
                                        </div>
                                        <p>
                                            From:{' '}
                                            {moment(exp.from).format(
                                                'MM/DD/YYYY'
                                            )}{' '}
                                            To:{' '}
                                            {exp.current
                                                ? 'Present'
                                                : moment(exp.to).format(
                                                      'MM/DD/YYYY'
                                                  )}
                                        </p>
                                        <div>
                                            <label className="font-semibold text-sm">
                                                From
                                                <i className="fa-asterisk text-red-500"></i>
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        <input type="submit" className="btn btn-primary my-1" />
                        <Link
                            to={`/employee/get/${id}`}
                            className="btn btn-light my-1"
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
