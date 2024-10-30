import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../assets/website/LOGO.svg'

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

  const handleAddQuestion = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Create Question',
      html: `
        <input id="survey" class="swal2-input" placeholder="Survey ID">
        <input id="text" class="swal2-input" placeholder="Question Text">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const survey = Swal.getPopup().querySelector('#survey').value;
        const text = Swal.getPopup().querySelector('#text').value;
        if (!survey || !text) {
          Swal.showValidationMessage('Please enter both Survey ID and Question Text');
        }
        return { survey, text };
      },
    });

    if (formValues) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/question/create/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newQuestion = await response.json();
        setQuestions([...questions, newQuestion]);

        Swal.fire('Question Created', '', 'success');
      } catch (error) {
        console.error('Error creating question:', error);
        setError('Error creating question. Please try again.');
      }
    }
  };

  const handleEditQuestion = async (question) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Question',
      html: `
        <input id="survey" class="swal2-input" placeholder="Survey ID" value="${question.survey}">
        <input id="text" class="swal2-input" placeholder="Question Text" value="${question.text}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const survey = Swal.getPopup().querySelector('#survey').value;
        const text = Swal.getPopup().querySelector('#text').value;
        if (!survey || !text) {
          Swal.showValidationMessage('Please enter both Survey ID and Question Text');
        }
        return { survey, text };
      },
    });

    if (formValues) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/api/question/update/${question.id}/`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedQuestion = await response.json();
        setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));

        Swal.fire('Question Updated', '', 'success');
      } catch (error) {
        console.error('Error updating question:', error);
        setError('Error updating question. Please try again.');
      }
    }
  };

  const handleDeleteQuestion = async (question) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/api/question/delete/${question.id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setQuestions(questions.filter(q => q.id !== question.id));

        Swal.fire('Deleted!', 'Your question has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting question:', error);
        setError('Error deleting question. Please try again.');
      }
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Convert the image to a base64 string
      const img = new Image();
      img.src = logo;

      img.onload = () => {
        // Add the logo to the PDF
        doc.addImage(img, 'JPEG', 10, 10, 30, 30); // Positioning the logo

        // Add the report name next to the logo
        doc.setFontSize(20);
        doc.text('Savey_Questions Report', 50, 25); // Positioning the text next to the logo

        // Draw a line under the header (optional)
        doc.setLineWidth(0.5);
        doc.line(10, 45, 200, 45);

        // Define the columns for the table
        const tableColumn = ["Survey_id", "Question_text", "Created_Date",];

        // Define the rows for the table
        const tableRows = questions.map(question => [
          question.survey, question.text,
          new Date(question.created_at).toLocaleString()
        ]);

        // Generate the table in the PDF
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 50, // Start the table below the logo and title
          theme: 'striped',
          styles: {
            fontSize: 10,
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: [255, 255, 255],
          },
        });

        // Save the generated PDF
        doc.save('Survey_questions_report.pdf');
      };
    } catch (error) {
      console.error('Error generating PDF report:', error);
      setError('Error generating PDF report. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4"> Questions List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className='flex justify-end'>
        <div className=' flex gap-4'>
          <button
            onClick={handleAddQuestion}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Question
          </button>

          <button onClick={handleDownloadPDF} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
            Print Report
          </button>

        </div>

      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Exam ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Question Text</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Updated At</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">No questions found.</td>
              </tr>
            ) : (
              questions.map((question) => (
                <tr key={question.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{question.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{question.survey}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{question.text}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(question.created_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(question.updated_at).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <button
                      onClick={() => handleEditQuestion(question)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
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
}

export default Survey_Questions;
