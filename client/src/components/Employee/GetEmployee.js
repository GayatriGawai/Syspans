import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../actions/employee';
import { Link } from 'react-router-dom';
import employeeSelectors from '../../selectors/employeeSelectors';
const GetEmployee = ({ getEmployeeById, employee }) => {
    const { id } = useParams();
    const employeeData = useSelector(employeeSelectors.employeeData);

    useEffect(() => {
        getEmployeeById(id);
    }, [getEmployeeById, id]);

    const dispatch = useDispatch();

    console.log(18, employeeData);
    // console.log(15, employeeData);
    // Destructure employee data
    const {
        name,
        status,
        designation,
        company,
        location,
        skills = [],
        details = [],
        education = [],
        experience = [],
    } = employee;

    console.log('Employee details from Redux store:', employee);
    return (
        <Fragment>
            <div>
                <div>
                    <header className="bg-yellow-600 w-fit h-16 py-2">
                        <p className="text-center font-semibold text-4xl px-5">
                            <i className="fas fa-user"></i> Welcome to the
                            profile of {employeeData.name}
                        </p>
                    </header>
                </div>
                <div>
                    <Link
                        to="/employees"
                        className="inline-block bg-gray-300 mt-5 py-2 px-5 ml-5 focus:outline-none hover:opacity-75 transition-opacity"
                    >
                        Back to list
                    </Link>
                </div>
                <div>
                    <div className="flex items-center justify-center">
                        <i className="fas fa-user-circle text-8xl mt-5"></i>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">
                            {employeeData.name}
                        </h2>
                        <p>{employeeData.status}</p>
                        <p>
                            {employeeData.designation} at {employeeData.company}
                        </p>
                        <p>{employeeData.location}</p>
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="p-1 display inline-block "
                            >
                                <i className="fas fa-check"></i> {skill}
                            </div>
                        ))}

                        {details.map((detail, index) => (
                            <div key={index} className="p-1">
                                <p>{detail.address}</p>
                                <p>{detail.email}</p>
                                <p>{detail.phone}</p>
                            </div>
                        ))}

                        <h3 className="text-lg font-semibold">Education</h3>
                        {education.length > 0 && (
                            <div>
                                {education.map((edu, index) => (
                                    <div key={index} className="p-1">
                                        <p>{edu.school}</p>
                                        <p>{edu.degree}</p>
                                        <p>{edu.fieldofstudy}</p>
                                        <p>{edu.description}</p>
                                        <p>{edu.from}</p>
                                        <p>{edu.to}</p>
                                        <p>{edu.current}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {education.length === 0 && <p>No Education added</p>}
                        <h3 className="text-lg font-semibold">Experience</h3>
                        {experience.length > 0 && (
                            <div className="mt-4">
                                {experience.map((exp, index) => (
                                    <div key={index}>
                                        <p>{exp.title}</p>
                                        <p>{exp.location}</p>
                                        <p>{exp.from}</p>
                                        <p>{exp.to}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {experience.length === 0 && (
                            <p>No experience available</p>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

GetEmployee.propTypes = {
    getEmployeeById: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log(68, state);
    const employee = state.employees ? state.employees.employee : null;

    return {
        employee: employee,
    };
};
export default connect(mapStateToProps, {
    getEmployeeById,
})(GetEmployee);
