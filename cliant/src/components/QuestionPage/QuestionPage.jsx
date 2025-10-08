import React from "react";
import QuestionForm from "../QuestionForm/QuestionForm";
import AskAi from '../../components/AskAI/AskAi'


const QuestionPage = () => {
  return (
    <div className="question-page">
      <h2>Ask a Programming Question</h2>
      <QuestionForm  />
      <AskAi />
    </div>
  );
};

export default QuestionPage;
