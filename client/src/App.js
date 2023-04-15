import Login from "./components/Login/Login";
import {Routes, Route} from "react-router-dom"; 
import Signup from "./components/Signup/Signup";
import { useEffect, useState } from "react";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import Home from "./containers/Home/Home";
import {connect} from 'react-redux';
import {fetchPuzzles, submitPuzzle} from "./actionsCreators/PuzzleActions"
import "./App.css";
import PuzzleList from "./containers/PuzzleList/PuzzleList.js";


function App(props) {

  const [username, setUsername] = useState(null);

  useEffect(() => {

    const jwt = sessionStorage.getItem("accessToken");

    if(jwt) {
      const {username} = JSON.parse(window.atob(jwt.split('.')[1]));
      setUsername(username);
    } 

  }, []); 

  

  useEffect(() => {

    const {fetchPuzzles} = props;
    
    fetchPuzzles(username);

  }, [username])



  const handleAuth = (username) => {
    setUsername(username);
  }

  const handleLogout = () => {

    sessionStorage.removeItem("accessToken");
    setUsername(null);

  }

  const {input1, input2, submitPuzzle, result1, result2} = props;

  return (
      <Routes>
          <Route path = "/" element = {<Home problem1Data = {input1} problem2Data = {input2} result1 = {result1} result2 = {result2}  username = {username} onLogout = {handleLogout} submitPuzzle = {submitPuzzle} />} />
          <Route path = "login" element = {<AuthRedirect username = {username}><Login onAuth = {handleAuth}/></AuthRedirect> } />
          <Route path = "signup" element = {<AuthRedirect username = {username}><Signup  onAuth = {handleAuth}/></AuthRedirect>} />
          <Route path = "/:username" element = {<PuzzleList />} />
      </Routes>
  );
}

const mapStateToProps = (state) => {

  const {puzzles} = state;
  const {puzzle1, puzzle2} = puzzles || {};

  const {input: input1, result: result1} = puzzle1 || {};
  const {input: input2, result: result2} = puzzle2 || {};


  return {
    input1, 
    input2,  
    result1, 
    result2
  }
}

export default connect(mapStateToProps, {fetchPuzzles, submitPuzzle})(App);
