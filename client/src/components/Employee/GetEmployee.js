import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../actions/employee';
import { Link } from 'react-router-dom';
import moment from 'moment';
import employeeSelectors from '../../selectors/employeeSelectors';

const GetEmployee = ({ getEmployeeById }) => {
    const { id } = useParams();
    const employeeData = useSelector(employeeSelectors.employeeData);

    useEffect(() => {
        getEmployeeById(id);
    }, [getEmployeeById, id]);

    return (
        <Fragment>
            <div>
                <div className="bg-yellow-600 h-16 md:h-auto py-2">
                    <header className="text-center font-semibold text-4xl px-5 md:text-xl">
                        <i className="fas fa-user"></i> Welcome to the profile
                        of {employeeData.name}
                    </header>
                </div>
                <div className="mt-5 ml-2">
                    <Link
                        to="/employees"
                        className="rounded inline-block bg-gray-300 py-2 px-5 focus:outline-none hover:opacity-75 transition-opacity"
                    >
                        Back to list
                    </Link>
                </div>

                <div className="rounded grid grid-cols-1 grid-rows-5 gap-4 bg-gray-200 m-2">
                    <div className="flex items-center justify-center col-span-1">
                        <i className="fas fa-user-circle text-10xl md:text-8xl"></i>
                    </div>
                    <div className="text-center col-span-1">
                        <h2 className="text-xl font-semibold mb-2">
                            {employeeData.name}
                        </h2>
                        <p className="capitalize">
                            Status: {employeeData.status}
                        </p>
                        <p>
                            {employeeData.designation} at {employeeData.company}
                        </p>
                        <p>{employeeData.location}</p>

                        <div className="flex items-center justify-center">
                            {employeeData &&
                            employeeData.skills &&
                            employeeData.skills.length ? (
                                employeeData.skills.map((skill, index) => (
                                    <div key={index} className="p-1 ml-2">
                                        <i className="fas fa-check"></i> {skill}
                                    </div>
                                ))
                            ) : (
                                <>No skills were added to this employee</>
                            )}
                        </div>
                    </div>
                    <div className="col-span-1 md:flex md:justify-between">
                        <div className="md:w-full">
                            <h3 className="text-lg justify-center font-semibold bg-yellow-600 w-full">
                                Details
                            </h3>
                            {employeeData &&
                            employeeData.details &&
                            employeeData.details.length ? (
                                employeeData.details.map((detail, index) => (
                                    <div key={index} className="p-1">
                                        <p>
                                            <b className="font-semibold mt-2">
                                                Address:
                                            </b>{' '}
                                            {detail.address}
                                        </p>
                                        <p>
                                            <b className="font-semibold mt-2">
                                                Email:
                                            </b>{' '}
                                            {detail.email}
                                        </p>
                                        <p>
                                            <b className="font-semibold">
                                                Phone:
                                            </b>{' '}
                                            {detail.phone}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <>No Details Found for selected employee!</>
                            )}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold  bg-yellow-600 w-fit">
                            Education
                        </h3>
                        {employeeData &&
                        employeeData.education &&
                        employeeData.education.length > 0 ? (
                            employeeData.education.map((edu, index) => (
                                <div key={index} className="p-1">
                                    <p>
                                        <b className="font-semibold">
                                            College:
                                        </b>{' '}
                                        {edu.school}
                                    </p>
                                    <p>
                                        <b className="font-semibold">Degree:</b>{' '}
                                        {edu.degree}
                                    </p>
                                    <p>
                                        <b className="font-semibold">
                                            Field of study:
                                        </b>{' '}
                                        {edu.fieldofstudy}
                                    </p>
                                    <p>{edu.description}</p>
                                    <p>
                                        From:{' '}
                                        {moment(edu.from).format('MM/DD/YYYY')}{' '}
                                        To:{' '}
                                        {moment(edu.to).format('MM/DD/YYYY')}
                                    </p>
                                    <p>{edu.current}</p>
                                </div>
                            ))
                        ) : (
                            <p>No Education added</p>
                        )}
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold  bg-yellow-600 w-fit">
                            Experience
                        </h3>

                        {employeeData &&
                        employeeData.experience &&
                        employeeData.experience.length > 0 ? (
                            <div className="mt-4">
                                {employeeData.experience.map((exp, index) => (
                                    <div key={index}>
                                        <p>
                                            <b className="font-semibold">
                                                Titke:
                                            </b>{' '}
                                            {exp.title}
                                        </p>
                                        <p>
                                            <b className="font-semibold">
                                                Comapny:
                                            </b>{' '}
                                            {exp.company}
                                        </p>
                                        <p>
                                            <b className="font-semibold">
                                                Location:
                                            </b>{' '}
                                            {exp.location}
                                        </p>
                                        <p>
                                            From:{' '}
                                            {moment(exp.from).format(
                                                'MM/DD/YYYY'
                                            )}{' '}
                                            To:{' '}
                                            {moment(exp.to).format(
                                                'MM/DD/YYYY'
                                            )}
                                        </p>
                                        <p>
                                            <b className="font-semibold">
                                                Description:
                                            </b>{' '}
                                            s{exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
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
