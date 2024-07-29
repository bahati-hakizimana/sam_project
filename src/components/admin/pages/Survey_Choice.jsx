import React, { useEffect, useState } from 'react';

function Survey_Choice() {
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/choices/', {
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
        setChoices(data.choices);
      } catch (error) {
        console.error('Error fetching choices:', error);
        setError('Error fetching choices. Please check your credentials and try again.');
      }
    };

    fetchChoices();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Choices List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Question ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Choice Text</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Updated At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {choices.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No choices found.</td>
              </tr>
            ) : (
              choices.map((choice) => (
                <tr key={choice.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{choice.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{choice.question}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{choice.text}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(choice.created_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(choice.updated_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Survey_Choice;