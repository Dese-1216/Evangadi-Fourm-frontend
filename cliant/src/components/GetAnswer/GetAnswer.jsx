import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosinstance from "../../Axios/axiosConfig";

const GetAnswer = () => {
  const { questionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch answers for this question
  const fetchAnswers = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RVc2VyIiwidXNlcmlkIjoxLCJpYXQiOjE3NTk4NDE1OTksImV4cCI6MTc1OTkyNzk5OX0.wVXgJUKtzrxHOjqoBTmvGi_reQgDNpnhjiXF76t9sbQ";

      const res = await axiosinstance.get(
        `answer/getanswer?questionid=${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswers(res.data.answers || []);
    } catch (err) {
      console.error("Error fetching answers:", err);
      setError("Failed to load answers");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAnswers();
  }, [questionId]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div>
        {answers.map((ans) => (
          <div
            key={ans.answerid}
            style={{
              display: "flex",
              alignItems: "flex-start",
              background: "#f9f9f9",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "18px",
                marginRight: "15px",
              }}
            >
              {ans.username ? ans.username.charAt(0).toUpperCase() : "U"}
            </div>

            {/* Answer body */}
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 8px", color: "#007bff" }}>
                {ans.username}
              </h4>
              <p
                style={{
                  margin: "0 0 10px",
                  lineHeight: "1.6",
                  color: "#333",
                  background: "#fff",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                }}
              >
                {ans.content}
              </p>
              <small style={{ color: "gray" }}>
                Posted on {new Date(ans.created_at).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAnswer;
