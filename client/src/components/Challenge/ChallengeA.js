import { useState } from "react";
import sumArray from "../../utils/sumArray";
import "./ChallengeA.css";


const ChallengeA = ({ problem1Data = [], username, submitPuzzle, result1 }) => { 

    const [resultantSum, setResultantSum] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [authMessage, setAuthMessage] = useState("");


    const handleChange = (e) => {
        const {value} = e.target;
        setResultantSum(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!username) {
            setAuthMessage("Kindly log in to submit!");
        } else {
            const actualSum = sumArray(problem1Data);
            if(actualSum == resultantSum) {
                submitPuzzle(username, problem1Data.join(" "), resultantSum, 1);
                setStatusMessage("Wohoo! That's right. Try out the next challenge");
                setResultantSum("");

            } else {
                setStatusMessage("Incorrect answer. Try again! :)")
            }
        }


    }

    return (
        (
            <>
                <div className="question-container">
                    <div className="title">
                        Solve this challenge
                    </div>
                    <div className="question">
                        You are given 2 numbers. You should add them and input the result in the box provided.
                    </div>
        
                    <div className="values">
                        <div className="value">
                        A: {problem1Data?.[0]}
                        </div>
                        <div className="value">
                        B: {problem1Data?.[1]}
                        </div>
                    </div>
        
                <form className="answer-container" onSubmit={handleSubmit} >
                    <input className="answer-input" disabled = {result1 && true} value = {result1 ? result1 : resultantSum} onChange={handleChange} type="number" placeholder="Enter your answer" />
                    <button className="submit-button" disabled = {result1 && true} type = "submit">Submit</button>
                </form>
                
                <div className="status-label">
                    Status: {result1 ? "COMPLETED": "NOT COMPLETED"}
                </div>
                <div>{statusMessage}</div>
                <div style = {{
                    color: "green"
                }}>{authMessage}</div>
                </div>
            </>
        
          )
    )

    return (
        <div>
             <div style = {{
                display: "flex", 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "space-around"
            }}>
                <h1>Solve this challenge</h1>
                <div>Status: {result1 ? "Completed": "Not Completed"}</div>
            </div>
            <div>
                You are given 2 numbers. You should add them and input the result in the box provided. 
            </div>
            <div>A: {problem1Data?.[0]}</div>
            <div>B: {problem1Data?.[1]}</div>
            <form onSubmit={handleSubmit}>
                <input disabled = {result1 && true} type = "number" value = {result1 ? result1 : resultantSum} onChange={handleChange}/>
                <button disabled = {result1 && true} type = "submit">SUBMIT</button>
            </form>
            <div>{statusMessage}</div>
            <div style = {{
                color: "green"
            }}>{authMessage}</div>
        </div>
    )
}

export default ChallengeA;