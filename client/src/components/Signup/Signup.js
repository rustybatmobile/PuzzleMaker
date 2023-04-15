import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";


const Signup = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(""); 
    const [passwordError, setPasswordError] = useState("");
    const [signupError, setSignupError] = useState("");
    
    const navigate = useNavigate();


    const handleChange = (e) => {

        const {name, value} = e.target;

        if(name === "username") {
            setUsername(value);
        } else {
            setPassword(value);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { onAuth} = props;


        if(username.length > 2 && password.length > 5) {

            try {
                const response = await fetch("http://localhost:4000/api/auth/register", {
                    method: "POST", 
                    body: JSON.stringify({
                        username, 
                        password
                    }), 
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if(response.ok) {
                    const {token: accessToken} = await response.json();
                    sessionStorage.setItem("accessToken", accessToken);
                    navigate("/");
                    onAuth(username);
                    //storage in sessionStorage now
                    setUsername("");
                    setPassword("");
                } else {
                    if(response.statusCode == "409") {
                        setSignupError("User already exists. Please login in");
                    }

                    if(response.status == "400") {
                        setSignupError("Please enter valid credentials")
                    }
                }
    

            } catch {
                console.warn("Sign up failed")
            }
            //after promise resolves, 
        } else {
            //refactor this
            if(username.length <= 2) {
                setUsernameError("Please enter valid username")
            } else {
                setUsernameError("");
            }
            

            if(password.length <= 5) {
                setPasswordError("Password should have >5 characters");
            } else {
                setPasswordError("");
            }

        }
    }

    return  (
        <div className = {styles.login_container}>
            <form onSubmit={handleSubmit} className = {styles.login_form} >
                <h1 className = {styles.login_header} >Sign up</h1>
                <div className = {styles.form_group} >
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name = "username"
                        value={username}
                        onChange={handleChange}
                    />
                    {usernameError && <p className = {styles.error_message}>{usernameError}</p>}
                </div>
                <div className = {styles.form_group} >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name = "password"
                        value={password}
                        onChange={handleChange}
                    />
                    {passwordError && <p className = {styles.error_message} >{passwordError}</p>}
                </div>
                <button type="submit" className = {styles.login_button} >
                    Sign up
                </button>
                
                <p className = {styles.signup_text}>Already have an account? Log in <Link to = "/login">here.</Link></p>
                <button onClick={() => navigate("/")} className = {styles.login_button} >
                    Go back home
                </button>
                {signupError && <p className = {styles.error_message}>{signupError}</p>}

            </form>
        </div>
    );
}

export default Signup;