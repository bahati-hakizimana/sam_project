import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewAnswersDetails() {
  const { id } = useParams(); // Get the answer ID from the URL
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswerDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/api/answer/related/${id}/`, {
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
        console.log('Fetched answer details:', data); // Check the data structure
        setAnswer(data);
      } catch (error) {
        console.error('Error fetching answer details:', error);
        setError('Error fetching answer details. Please try again.');
      }
    };

    fetchAnswerDetails();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!answer) return <p>Loading...</p>;

  // Debugging log for answer state
  console.log('Rendered answer details:', answer);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Answer Details</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="py-3 px-6 text-sm font-semibold">Survey Title</td>
            <td className="py-3 px-6 text-sm">{answer.survey_title}</td>
          </tr>
          <tr>
            <td className="py-3 px-6 text-sm font-semibold">Survey Category</td>
            <td className="py-3 px-6 text-sm">{answer.survey_category}</td>
          </tr>
          <tr>
            <td className="py-3 px-6 text-sm font-semibold">Question Text</td>
            <td className="py-3 px-6 text-sm">{answer.question_text}</td>
          </tr>
          <tr>
            <td className="py-3 px-6 text-sm font-semibold">Choice Text</td>
            <td className="py-3 px-6 text-sm">{answer.choice_text}</td>
          </tr>
          <tr>
            <td className="py-3 px-6 text-sm font-semibold">Is Positive</td>
            <td className="py-3 px-6 text-sm">
              {answer.is_positive ? 'True' : 'False'}
            </td>
          </tr>
          <tr>
            <td className="py-3 px-6 text-sm font-semibold">Tenant Username</td>
            <td className="py-3 px-6 text-sm">{answer.tenant_username}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewAnswersDetails;
