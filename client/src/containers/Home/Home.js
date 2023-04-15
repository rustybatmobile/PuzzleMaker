import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChallengeA from "../../components/Challenge/ChallengeA";
import ChallengeB from "../../components/Challenge/ChallengeB";
import "./Home.css";


const Home = ({username, problem1Data, problem2Data, onLogout, submitPuzzle, result1, result2}) => {

    const [currProb, setCurrProb] = useState(0);

    const navigate = useNavigate();

    const handleAuthClick = (e) => {
        const {name} = e.target;
        if(name === "login") {
            navigate("/login");
        } else if(name === "logout") {
            onLogout();
        } else {
            navigate("/signup");
        }
    }

    const handleToggle = (e) => {

        const {name} = e.target;

        if(name == "next") {
            setCurrProb(1);
        } else {
            setCurrProb(0);
        }
    }

    return (
        <div className="quiz-page">
            <header className="header">
                <div className="welcome-message">WELCOME {username}</div>
                <div className="login-signup-buttons">
                    {username ? <button className="signup-button"  name = "logout" onClick={handleAuthClick}>Log out </button> : 
                        (<>
                            <button className="login-button" name = "login" onClick={handleAuthClick} >Login</button>
                            <button className="signup-button" onClick={handleAuthClick} name = "signup" >Sign Up</button>
                        </>
                        )
                    }
                </div>
            </header>
            {currProb == "0" ? <ChallengeA result1 = {result1} submitPuzzle = {submitPuzzle} username = {username} problem1Data={problem1Data} /> : <ChallengeB result2 = {result2} submitPuzzle = {submitPuzzle} problem2Data = {problem2Data} username= {username} /> } 
            {currProb == "0" ? <button className="next-button" onClick={handleToggle} name = "next">NEXT CHALLENGE</button> : <button onClick={handleToggle} name = "prev">PREVIOUS CHALLENGE</button>}
        </div>
    )
}

export default Home;