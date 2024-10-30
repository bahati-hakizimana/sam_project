import React, { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Application = () => {
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/api/applicants/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
            console.log(response)
        //   throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        setError('Error fetching applicants. Please try again.');
      }
    };

    fetchApplicants();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/api/applicants/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setApplicants(applicants.filter(applicant => applicant.id !== id));
    } catch (error) {
      console.error('Error deleting applicant:', error);
      setError('Error deleting applicant. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Applicant List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">First Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Last Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No applicants found.</td>
              </tr>
            ) : (
              applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{applicant.first_name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{applicant.last_name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{applicant.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{applicant.status}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 flex space-x-2">
                    <Link to={`/admin/applicant/${applicant.id}`} className="text-gray-700 hover:text-blue-500">
                      View Details
                    </Link>
                    <Link to={`/admin/updateapplicant/${applicant.id}`} className="text-gray-700 hover:text-green-500">
                      <FaEdit className="text-xl" />
                    </Link>
                    <button onClick={() => handleDelete(applicant.id)} className="text-gray-700 hover:text-red-500">
                      <MdAutoDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Application;
