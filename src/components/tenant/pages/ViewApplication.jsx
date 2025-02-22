import React, { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ViewApplication = () => {
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/api/applicants/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white';  // Green background for approved
      case 'denied':
        return 'bg-red-500 text-white';  // Red background for denied
      case 'pending':
        return 'bg-yellow-500 text-white';  // Yellow background for pending
      default:
        return 'bg-gray-300 text-gray-700';  // Default gray if status is unknown
    }
  };

  const getEmoji = (status) => {
    switch (status) {
      case 'approved':
        return '😊';  // Smiley face for approved
      case 'denied':
        return '😞';  // Sad face for denied
      case 'pending':
        return '⏳';  // Hourglass for pending
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">View Applicants</h1>
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
                  <td className="py-4 px-6 text-sm">
                    <div className={`inline-flex items-center justify-center w-20 h-8 rounded-full ${getStatusStyle(applicant.status)} space-x-2`}>
                      <span className="text-xs">{getEmoji(applicant.status)}</span>
                      <span className="text-xs">{applicant.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 flex space-x-2">
                    {/* Action buttons here */}
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

export default ViewApplication;
