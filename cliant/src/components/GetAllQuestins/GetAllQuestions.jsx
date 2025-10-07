import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GetAllQuestions.css"; // Optional: for styling

const GetAllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/get-all-questions"
        );
        setQuestions(res.data.response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="questions-container">
      <h2>All Questions</h2>
      {questions.map((q) => (
        <div key={q.questionid} className="question-card">
          <div className="user-icon">👤</div>
          <div className="question-content">
            <p className="username">{q.username}</p>
            <h3 className="title">{q.title}</h3>
          </div>
          <div className="arrow">➡️</div>
        </div>
      ))}
    </div>
  );
};

export default GetAllQuestions;
