import generateNRandomNumbersBetweenGivenRange from "../utils/randomNum";

export const fetchPuzzles = (username) => {

    return async function(dispatch) {
        
        dispatch(fetchPuzzlesRequest());
        
        if(!username) {
        
            const puzzle1Input = generateNRandomNumbersBetweenGivenRange(1, 1000, 2);
            const puzzle2Input = generateNRandomNumbersBetweenGivenRange(1, 1000, 500);

            dispatch(fetchPuzzlesSuccess({
                puzzle1Input, 
                puzzle2Input, 
                username
            }))

        } else {

            try {
                const response = await fetch(`http://localhost:4000/api/puzzles/${username}`);
                const data = await response.json();
                const {inputA, resultA = "", inputB, resultB = ""} = data || {};
                
                const puzzle1Input = convertArrOfStringsToNums(inputA?.split(" "));
                const puzzle2Input = convertArrOfStringsToNums(inputB?.split(" "));
    
                dispatch(fetchPuzzlesSuccess({
                    puzzle1Input, 
                    puzzle1Result: resultA,
                    puzzle2Input, 
                    puzzle2Result: resultB
                }))
            } catch(error) {
                dispatch(fetchPuzzlesFailure({
                    error
                }))
            }

        }
    }
}


// Submit a puzzle

export const submitPuzzle = (username, input, result, puzzletype) => {

    return async function(dispatch) {

        dispatch(submitPuzzleRequest());

        try {
            const response = await fetch("http://localhost:4000/api/puzzles", {
                method: "POST", 
                body: JSON.stringify({
                    username, 
                    input, 
                    result, 
                    puzzletype
                }), 
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if(response.ok) {
                const data = await response.json();

                dispatch(submitPuzzleSuccess({
                    puzzletype, 
                    result
                }));

            } else {
                console.warn("Puzzle submission failed");
            }
    
        } catch(err) {
            console.log("Puzzle submission failed")
        }

    }
} 

const submitPuzzleRequest = () => {
    return {
        type: "SUBMIT_PUZZLE_REQUEST"
    }
}

const submitPuzzleSuccess = (payload) => {
    return {
        type: "SUBMIT_PUZZLE_SUCCESS",
        payload
    }
}



const fetchPuzzlesRequest = () => {
    return {
        type: "FETCH_PUZZLES_REQUEST"
    }
}

const fetchPuzzlesSuccess = (payload) => {
    return {
        type: "FETCH_PUZZLES_SUCCESS", 
        payload
    }
}

const fetchPuzzlesFailure = () => {
    return {
        type: "FETCH_PUZZLES_FAILURE"
    }
}


function convertArrOfStringsToNums(arr) {
    const result = [];

    if(!Array.isArray(arr)) {
        return arr;
    }

    arr.forEach(item => result.push(Number(item)));

    return result;
}