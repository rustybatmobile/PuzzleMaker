import React from "react";
import "./QuizPage.css"; // import the CSS file

function QuizPage() {
  return (
    <div className="quiz-page">
      <div className="header">
        <div className="welcome-message">Welcome Harish</div>
        <div className="login-signup-buttons">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
      <div className="question-container">
        <div className="title">Solve this challenge</div>
        <div className="question">You are given 2 numbers. You should add them and input the result in the box provided.</div>
        <div className="values">
          <div className="value">A: 644</div>
          <div className="value">B: 958</div>
        </div>
        <div className="answer-container">
          <input className="answer-input" type="text" placeholder="Enter your answer here" />
          <button className="submit-button">SUBMIT</button>
        </div>
        <button className="next-button">Next challenge</button>
      </div>
    </div>
  );
}

export default QuizPage;
