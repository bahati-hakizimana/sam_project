import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function StartSurvey() {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState({});
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 2;

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        // Fetch questions related to the survey
        const questionsResponse = await axios.get(`http://127.0.0.1:8000/api/questions/by-survey/${surveyId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setQuestions(questionsResponse.data.questions);

        // Fetch choices for each question
        const choicesData = {};
        for (const question of questionsResponse.data.questions) {
          const choicesResponse = await axios.get(`http://127.0.0.1:8000/api/choices/question/${question.id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          choicesData[question.id] = choicesResponse.data.choices;
        }

        setChoices(choicesData);
      } catch (error) {
        console.error('Error fetching survey data:', error);
        setError('Error fetching survey data. Please try again.');
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  const handleAnswerChange = (questionId, choiceId) => {
    setAnswers({
      ...answers,
      [questionId]: choiceId,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const tenantIdString = localStorage.getItem('user_id');
      if (!token || !tenantIdString) {
        setError('No access token or user ID found');
        return;
      }

      const tenantId = parseInt(tenantIdString, 10);

      const answersData = Object.keys(answers).map((questionId) => ({
        question: parseInt(questionId, 10),
        choice: answers[questionId],
        tenant: tenantId,
      }));

      // Submit each answer
      for (const answerData of answersData) {
        await axios.post('http://127.0.0.1:8000/api/answer/create/', answerData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      // Show SweetAlert message
      Swal.fire({
        title: 'Thank You!',
        text: 'Thank you for taking our survey.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Optionally redirect or reset form
      });
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('Error submitting answers. Please try again.');
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next') {
        return Math.min(prevPage + 1, Math.ceil(questions.length / questionsPerPage));
      } else if (direction === 'prev') {
        return Math.max(prevPage - 1, 1);
      }
      return prevPage;
    });
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Start Survey</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {questions.length > 0 ? (
            currentQuestions.length > 0 ? (
              currentQuestions.map((question) => (
                <div key={question.id}>
                  <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
                  <div className="space-y-2">
                    {choices[question.id] && choices[question.id].length > 0 ? (
                      choices[question.id].map((choice) => (
                        <div key={choice.id}>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={choice.id}
                              checked={answers[question.id] === choice.id}
                              onChange={() => handleAnswerChange(question.id, choice.id)}
                              className="mr-2"
                            />
                            {choice.text}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p>No choices available for this question.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No questions available on this page.</p>
            )
          ) : (
            <p>No questions and answers related to this survey.</p>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => handlePageChange('prev')}
            className="py-2 px-4 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => handlePageChange('next')}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            disabled={indexOfLastQuestion >= questions.length}
          >
            Next
          </button>
        </div>

        {questions.length > 0 && (
          <button type="submit" className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Submit Answers
          </button>
        )}
      </form>
    </div>
  );
}

export default StartSurvey;
