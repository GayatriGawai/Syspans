import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ currentPage, totalPage = 0, onPageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto flex justify-center items-center mt-4">
            <ul className="flex list-none">
                <li
                    className={`mr-1 ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    <button
                        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`mx-1 ${
                            number === currentPage ? 'opacity-50' : ''
                        }`}
                    >
                        <button
                            className={`px-3 py-2 rounded-md ${
                                number === currentPage
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li
                    className={`ml-1 ${
                        currentPage === totalPage
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                    }`}
                >
                    <button
                        className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPage}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
