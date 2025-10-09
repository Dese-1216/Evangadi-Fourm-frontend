import React, { useState } from 'react';
import axiosInstance from '../../../Axios/axiosConfig'; // Assuming this is in your project
import QuestionList from '../QuestionList/QuestionList'; // Adjust path based on your folder structure
import QuestionDetails from '../Singlequestion/Singlequestion'; // Adjust path based on your folder structure

const QuestionApp = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [error, setError] = useState(null);

  const fetchSingleQuestion = async (questionId) => {
    try {
      const response = await axiosInstance.get(`/questions/question?questionid=${questionId}`);
      if (response.status === 200) {
        setSelectedQuestion(response.data.questions || {});
      } else {
        setError('Failed to fetch question details');
      }
    } catch (err) {
        console.log(err);
      setError('Error fetching question details');
    }
  };

  const handleQuestionClick = (questionId) => {
    fetchSingleQuestion(questionId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Question App</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <QuestionList onQuestionClick={handleQuestionClick} />
      <QuestionDetails
        selectedQuestion={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
      />
    </div>
  );
};

export default QuestionApp;