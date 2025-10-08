import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../context/UserProvide";
import axios from '../../Axios/axiosConfig'; 
import './answerPage.css';


// Component to display a single answer
const AnswerItem = ({ answer }) => {
    
    const displayUsername = answer.username || 'Anonymous User'; 
    
    return (
        <div className="answer-item">
            <div className="answer-user-avatar">
                {/* Display first letter of username */}
                <span>{displayUsername[0].toUpperCase()}</span> 
            </div>
            <div className="answer-content">
                <p className="answer-username">{displayUsername}</p>
                <p className="answer-text">{answer.answer}</p>
            </div>
        </div>
    );
};

// --- Main Page Component ---

const AnswerPage = () => {
    const { questionId } = useParams();
    const { user } = useContext(UserContext);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching: GET Question and GET Answers ---
    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            setError(null);
            
            // FIX 1: Prevent API call if questionId is undefined (Routing Error)
            // if (!questionId) {
            //     console.error("Routing Error: questionId is missing.");
            //     setError("Question link is invalid. Please ensure you clicked a valid question.");
            //     setIsLoading(false);
            //     return; 
            // }
            
            try {
                const token = user?.token || localStorage.getItem("token");
                 
                // 1. Fetch the specific question details
                
                const questionRes = await axios.get(`/questions/question?questionid=${questionId}`,
                     { headers: { Authorization: `Bearer ${token}` } }
                ); 
                setQuestion(questionRes.data.questions[0] || null);
               
                // 2. Fetch all existing answers for this question
            
                const answersRes = await axios.get(`/answer/getanswer?questionid=${questionId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                ); 
                setAnswers(answersRes.data.answers || []); 

            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message;
                console.error("Fetch Error:", errorMessage);
                setError(`Failed to load content. Server message: ${errorMessage}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [questionId, user?.token]); 

    // --- Answer Submission: POST Answer ---
    const handleAnswerSubmit = async (e) => {
        e.preventDefault();

    //        if (!user?.userid) {
    //   alert("You must be logged in to post an answer.");
    //   return;
    // }

        
        if (!newAnswer.trim()) {
            // Note: Use a custom UI modal instead of alert() in production
            alert("Answer cannot be empty."); 
            return;
        }

       
        try {
              const token = user?.token || localStorage.getItem("token");
            const res = await axios.post(`/answer`, {
               userid: user.userid,
                answer: newAnswer
            },    { headers: { Authorization: `Bearer ${token}` } });

            // Update the UI with the newly posted answer
            if (res.data.answer) {
                
                setAnswers((prevAnswers) => [
                    { ...res.data.answer, id: Date.now(), username: res.data.answer.username || "Current User" }, 
                    ...prevAnswers
                ]);
            }

            setNewAnswer('');
            alert(res.data.message || "Answer submitted successfully!"); 

        } catch (err) {
            console.error("Submission Error:", err.response?.data?.message || err.message);
            alert("Failed to submit answer. Please ensure you are logged in.");
        }
    };

    if (isLoading) return <div className="answer-container loading">Loading...</div>;
    if (error) return <div className="answer-container error-message">Error: {error}</div>;
    if (!question) return <div className="answer-container error-message">Question Not Found.</div>;

    return (
        <div className="answer-container">
            {/* Question Section */}
            <section className="question-display-section">
                <h1 className="question-title">{question.title || "Question Title"}</h1>
                <p className="question-meta">Asked by **{question.username || "N/A"}**</p>
                <p className="question-body">{question.description || "No description provided."}</p>
            </section>
            
            <hr />

            {/* Answer Submission Form */}
            <section className="answer-form-section">
                <h2 className="form-title">Answer the Question</h2>
                <form onSubmit={handleAnswerSubmit} className="answer-form">
                    <textarea
                        className="answer-textarea"
                        placeholder="Type your answer here..."
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="submit-answer-btn">
                        Post Your Answer
                    </button>
                </form>
            </section>

            <hr />
            
            {/* Answers List Section */}
            <section className="answers-list-section">
                <h2 className="answers-count">{answers.length} Answers</h2>
                <div className="answers-list">
                    {answers.map((ans, index) => (
                       
                        <AnswerItem key={ans.id || index} answer={ans} />

                    ))}
                    {answers.length === 0 && <p className="no-answers">Be the first to answer this question!</p>}
                </div>
            </section>
        </div>
    );
};

export default AnswerPage;
