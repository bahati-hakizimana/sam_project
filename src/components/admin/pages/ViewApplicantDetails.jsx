import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
function ViewApplicantDetails() {
    const { id } = useParams();  // Capture applicant ID from the URL
    const [applicant, setApplicant] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicantDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/api/applicants/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setApplicant(data);
            } catch (error) {
                console.error('Error fetching applicant details:', error);
                setError('Error fetching applicant details. Please try again.');
            }
        };

        fetchApplicantDetails();
    }, [id]);

    // const handleViewPDF = (url) => {
    //     Swal.fire({
    //         title: 'Document',
    //         html: `<iframe src="${url}" width="100%" height="400px" frameborder="0" style="border: none;"></iframe>`,
    //         showCloseButton: true,
    //         confirmButtonText: 'Close',
    //         didOpen: () => {
    //             // Optional: Automatically play the PDF document when opened
    //             const iframe = Swal.getHtmlContainer().querySelector('iframe');
    //             iframe.onload = () => {

    //                 Swal.hideLoading();
    //             };
    //         },
    //     });
    // };

    const handleViewPDF = (url) => {
        window.open(url, '_blank'); // Opens the PDF in a new tab
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!applicant) {
        return <p>Loading applicant details...</p>;
    }

    return (
        <div className="container mx-auto mt-10 p-5 border rounded-md shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Applicant Details</h1>
            <p><strong>First Name:</strong> {applicant.first_name}</p>
            <p><strong>Last Name:</strong> {applicant.last_name}</p>
            <p><strong>Phone Number:</strong> {applicant.phone_number}</p>
            <p><strong>Email:</strong> {applicant.email}</p>
            <p><strong>Date of Birth:</strong> {applicant.date_of_birth}</p>
            <p><strong>Status:</strong> {applicant.status}</p>
            <p>
                <strong>National ID:</strong>{' '}
                <button
                    onClick={() => handleViewPDF(applicant.national_id)}
                    className="text-blue-500 hover:underline"
                >
                    View National ID
                </button>
            </p>
            <p>
                <strong>Degree or Diploma:</strong>{' '}
                <button
                    onClick={() => handleViewPDF(applicant.degree_or_diploma)}
                    className="text-blue-500 hover:underline"
                >
                    View Degree/Diploma
                </button>
            </p>
        </div>
    );
}

export default ViewApplicantDetails;

