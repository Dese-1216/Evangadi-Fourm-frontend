import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Axios/axiosConfig'; // Adjust path as needed

const QuestionList = ({ onQuestionClick }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get('/questions/all-questions', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('API Response:', response.data); // Debug
        if (response.status === 200) {
          setQuestions(response.data.response || []);
        } else {
          setError('Failed to fetch questions');
        }
      } catch (err) {
        setError('No questions available now. Please try again.');
        console.log('Error:', err); // Debug
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {questions.length > 0 ? (
        questions.map((question) => (
            
          <div
         
            key={question.questionid}
            className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => onQuestionClick(question.questionid)}
            
          >
            <p className="text-lg font-medium">{question.title}</p>
            <p className="text-sm text-gray-600">Asked by: {question.username}</p>
            
          </div>
          
        ))
      ) : (
        <p className="text-gray-500">No questions yet.</p>
      )}
    </div>
  );
};

export default QuestionList;