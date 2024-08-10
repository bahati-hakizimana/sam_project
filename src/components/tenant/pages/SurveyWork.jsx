import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

function SurveyWork() {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
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

        // Fetch questions
        const questionsResponse = await fetch(`http://127.0.0.1:8000/api/questions?survey=${surveyId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!questionsResponse.ok) {
          throw new Error(`HTTP error! status: ${questionsResponse.status}`);
        }

        const questionsData = await questionsResponse.json();
        setQuestions(questionsData.questions);
        console.log('Questions:', questionsData.questions); // Debugging

        // Fetch choices
        const choicesResponse = await fetch('http://127.0.0.1:8000/api/choices/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!choicesResponse.ok) {
          throw new Error(`HTTP error! status: ${choicesResponse.status}`);
        }

        const choicesData = await choicesResponse.json();
        setChoices(choicesData.choices);
        console.log('Choices:', choicesData.choices); // Debugging
      } catch (error) {
        console.error('Error fetching survey data:', error);
        setError('Error fetching survey data. Please check your credentials and try again.');
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
      if (!token) {
        setError('No access token found');
        return;
      }

      const tenantIdString = localStorage.getItem('user_id'); // Fetch user_id from localStorage
      if (!tenantIdString) {
        setError('No user ID found');
        return;
      }

      const tenantId = parseInt(tenantIdString, 10);
      if (isNaN(tenantId)) {
        setError('Invalid user ID');
        return;
      }

      // Prepare the answers data
      const answersData = Object.keys(answers).map(questionId => ({
        question: parseInt(questionId, 10),
        choice: answers[questionId],
        tenant: tenantId,
      }));

      console.log('Submitting answers:', answersData); // Debugging

      // Submit each answer
      for (const answerData of answersData) {
        const response = await fetch('http://127.0.0.1:8000/api/answer/create/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answerData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // Show SweetAlert message
      Swal.fire({
        title: 'Thank You!',
        text: 'Thank you for taking our survey.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // navigate('/surveys'); // Navigate after closing the alert
      });
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('Error submitting answers. Please try again.');
    }
  };

  // Calculate the current questions to display
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Handle page change
  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
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
      <h1 className="text-2xl font-bold mb-4">Survey Questions</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question) => (
              <div key={question.id}>
                <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
                <div className="space-y-2">
                  {choices.filter(choice => choice.question === question.id).length > 0 ? (
                    choices.filter(choice => choice.question === question.id).map((choice) => (
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
            <p>No questions available.</p>
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
        <button type="submit" className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Submit Answers
        </button>
      </form>
    </div>
  );
}

export default SurveyWork;
