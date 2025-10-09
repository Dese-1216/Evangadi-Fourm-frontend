import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Axios/axiosConfig'; // Adjust path as needed

const SingleQuestion = () => {
  const { questionid } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleQuestion = async () => {
      try {
        const response = await axiosInstance.get(`/questions/question?questionid=${questionid}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Single Question Response:', response.data); // Debug
        if (response.status === 200) {
          setQuestion(response.data.questions[0] || {});
        } else {
          setError('Failed to fetch question details');
        }
      } catch (err) {
        setError('Error fetching question details');
        console.log('Error:', err); // Debug
      }
    };
    fetchSingleQuestion();
  }, [questionid]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!question) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Question Details</h1>
      <div className="p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
        <p className="text-lg mb-2">{question.description}</p>
        <p className="text-sm text-gray-600 mb-4">Asked by: {question.username}</p>
        {question.tag && <p className="text-sm text-gray-600 mb-4">Tag: {question.tag}</p>}
        <button
          onClick={() => navigate('/home')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SingleQuestion;