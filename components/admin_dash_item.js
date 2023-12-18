import React from 'react';

const DashboardItem = ({ iconClass, title }) => {
    return (
        <a className="dashboard-item px-5" href="#">
            <i className={`icon fa-6x mt-16 ${iconClass} text-yellow-700`}></i>
            <p className="font-semibold">{title}</p>
        </a>
    );
};

export default DashboardItem;
