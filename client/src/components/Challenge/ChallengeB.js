import { useState } from "react";
import descOrder from "../../utils/descOrder";


const ChallengeB = ({ problem2Data, username, submitPuzzle, result2 }) => { 

    const [resultantValue, setResultantValue] = useState("");
    const [isCompleted, setIsCompleted] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [authMessage, setAuthMessage] = useState("");


    const handleChange = (e) => {
        const {value} = e.target;
        setResultantValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!username) {

            setAuthMessage("Kindly log in to submit!");

        } else {

            const descOrderArray = descOrder(problem2Data);
            const actualValue = descOrderArray[299];
            console.log(actualValue, "actualvalue")
            if(actualValue == resultantValue) {
                setIsCompleted(true);
                submitPuzzle(username, problem2Data.join(" "), resultantValue, 2);
                setStatusMessage("Wohoo! That's right. You've finished the series!");
                setResultantValue("");

            } else {
                setStatusMessage("Incorrect answer. Try again! :)")
            }
        }
    }

    return (
        <div>
             <div style = {{
                display: "flex", 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "space-around"
            }}>
                <h1>Solve this challenge</h1>
                <div>Status: {result2 ? "Completed": "Not Completed"}</div>
            </div>
            <div>
                You are 500 numbers listed below that are between 1 - 1000. You must now sort the numbers in descending
                order and submit the number that is in the 300th position.  
            </div>
            <div>{problem2Data.join(" ")}</div>
            
            <form onSubmit={handleSubmit}>
                <input disabled = {result2 && true} type = "number" value = {result2 ? result2 : resultantValue} onChange={handleChange}/>
                <button disabled = {result2 && true} type = "submit">SUBMIT</button>
            </form>
            <div>{statusMessage}</div>
            <div style = {{
                color: "green"
            }}>{authMessage}</div>
        </div>
    )
}

export default ChallengeB;