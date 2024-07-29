import React, { useEffect, useState } from 'react';

function Survey_Questions() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/questions/', {
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
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Error fetching questions. Please check your credentials and try again.');
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Survey Questions List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Survey ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Question Text</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Updated At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No questions found.</td>
              </tr>
            ) : (
              questions.map((question) => (
                <tr key={question.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{question.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{question.survey}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{question.text}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(question.created_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(question.updated_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Survey_Questions;
