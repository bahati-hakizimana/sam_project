
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SurveyWork() {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch surveys
  useEffect(() => {
    fetchSurveys();
  }, [page]);

  const fetchSurveys = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/surveys/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSurveys(response.data.surveys);
      // Assuming the API returns a total_pages field for pagination
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  // Pagination Handlers
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Surveys</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surveys.map((survey) => (
          <div key={survey.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{survey.title}</h2>
            <p className="text-gray-700">{survey.description}</p>
            <span className="text-sm text-gray-500">Category: {survey.category}</span>
            <br />
            <span className="text-sm text-gray-500">Created At: {new Date(survey.created_at).toLocaleDateString()}</span>
            <br />
            {/* Link to start the survey */}
            <Link
              to={`/tenant/start-survey/${survey.id}`}
              className="text-white px-4 py-1 rounded-lg hover:text-blue-700 bg-blue-900 mt-4 inline-block"
            >
              Start Survey
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SurveyWork;

