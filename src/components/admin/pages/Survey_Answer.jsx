import React, { useEffect, useState } from 'react';

function Survey_Answer() {
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/answers/', {
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
        setAnswers(data.answers);
      } catch (error) {
        console.error('Error fetching answers:', error);
        setError('Error fetching answers. Please check your credentials and try again.');
      }
    };

    fetchAnswers();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Answers List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Question ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Choice ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Tenant ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Submitted At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {answers.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No answers found.</td>
              </tr>
            ) : (
              answers.map((answer) => (
                <tr key={answer.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{answer.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{answer.question}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{answer.choice}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{answer.tenant}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(answer.submitted_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Survey_Answer;