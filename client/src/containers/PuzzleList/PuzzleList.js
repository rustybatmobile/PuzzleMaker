import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PuzzleItem from "../../components/PuzzleItem/PuzzleItem";
import { useNavigate } from "react-router-dom";
import styles from "./PuzzleList.module.css";



const questionContentByTypes = {
    1:  "You are given 2 numbers. You should add them and input the result in the box provided", 
    2: "You are 500 numbers listed below that are between 1 - 1000. You must now sort the numbers in descending order and submit the number that is in the 300th position."
}

const data = [
    {
        problemType: 1, 
        input: [23, 522], 
        result: "232"
    }, 
    {
        problemType: 1, 
        input: [493, 874], 
        result: "3945"
    }
]


const PuzzleList = () => {

    const {username} = useParams();
    const [puzzleList, setPuzzleList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchPuzzleData() {
            const response = await fetch(`http://localhost:4000/api/puzzles/${username}`)
            const data = await response.json();
            const {inputA, resultA, inputB, resultB} = data || {};
                
            const puzzle1Input = convertArrOfStringsToNums(inputA?.split(" "));
            const puzzle2Input = inputB; 

            const puzzleList = [];

            if(puzzle1Input) {
                puzzleList.push({
                    problemType: 1, 
                    input: puzzle1Input, 
                    result: resultA
                })
            }

            if(puzzle2Input) {
                puzzleList.push({
                    problemType: 2, 
                    input: puzzle2Input, 
                    result: resultB
                })
            }

            setPuzzleList(puzzleList);
            
        }

        fetchPuzzleData();


    }, [])

    

    return (
        <div>
            <h1 style = {{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "24px 0"
            }}>Here are the puzzles finished by {username}</h1>
            <div>
                <button className = {styles.login_button} onClick={() => navigate("/")}>Go back to home</button>
            </div>
            {puzzleList.length > 0 ? puzzleList.map(puzzle => {
                const {problemType, input, result} = puzzle;
                const question = questionContentByTypes[problemType];
                return <PuzzleItem question = {question} input = {input} result = {result} problemType = {problemType}/>
            }) : <span>Can't find any completed puzzles</span>}
        </div>
    )
}

export default PuzzleList;



function convertArrOfStringsToNums(arr) {
    const result = [];

    if(!Array.isArray(arr)) {
        return arr;
    }

    arr.forEach(item => result.push(Number(item)));

    return result;
}