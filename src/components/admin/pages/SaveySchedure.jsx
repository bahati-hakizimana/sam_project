import React, { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SaveySchedure = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Update token key
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/surveys/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSurveys(data.surveys);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setError('Error fetching surveys. Please check your credentials and try again.');
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Survey List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">Title</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Description</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {surveys.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">No surveys found.</td>
              </tr>
            ) : (
              surveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-4 px-6 text-sm text-gray-700">{survey.title}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{survey.description}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{new Date(survey.created_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 flex space-x-2">
                    <Link to={`/surveys/edit/${survey.id}`} className="text-gray-700 hover:text-green-500">
                      <FaEdit className="text-xl" />
                    </Link>
                    <button className="text-gray-700 hover:text-red-500">
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

export default SaveySchedure
