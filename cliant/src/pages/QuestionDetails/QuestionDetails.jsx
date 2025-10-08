import React, { useState } from "react";
import GetAnswer from "../../components/GetAnswer/GetAnswer";

const QuestionDetail = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>
      <GetAnswer answers={answers} loading={loading} error={error} />
    </>
  );
};

export default QuestionDetail;
