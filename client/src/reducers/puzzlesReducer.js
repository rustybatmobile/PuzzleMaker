const initialState = {
    puzzle1: {
        input: "",
        result: "", 
    }, 
    puzzle2: {
        input: "", 
        result: "",
    }, 
    isLoading: false, 
}


export default function puzzlesReducer (state = initialState, {type, payload}) {
    switch(type) {
        case "FETCH_PUZZLES_REQUEST": {
            return {
                ...state, 
                isLoading: true
            }
        }

        case "FETCH_PUZZLES_SUCCESS": {

            const {puzzle1Input, puzzle2Input, puzzle1Result = "", puzzle2Result = "", username} = payload || {};
            

            if(!puzzle1Input) {
                if(!puzzle2Input) {
                    return state;
                } else {
                    return {
                        ...state, 
                        puzzle2: {
                            result: puzzle2Result,
                            input: puzzle2Input
                        },
                    }
                }
            } else {
                if(puzzle2Input) {
                    return {
                        ...state, 
                        puzzle1: {
                            result: puzzle1Result,
                            input: puzzle1Input
                        }, 
                        puzzle2: {
                            result: puzzle2Result,
                            input: puzzle2Input 
                        },
                        isLoading: false
                    } 
                } else {
                    return {
                        ...state, 
                        puzzle1: {
                            input: puzzle1Input, 
                            result: puzzle1Result
                        }, 
                        isLoading: false
                    } 
                }
            }
        }

        case "FETCH_PUZZLES_FAILURE": {
            return {
                ...state, 
                error: payload
            }
        }

        case "SUBMIT_PUZZLE_REQUEST": {
            return {
                ...state, 
                isLoading: true
            }
        }

        case "SUBMIT_PUZZLE_SUCCESS": {

            const {result, puzzletype} = payload;

            if(puzzletype == "1") {
                return {
                    ...state, 
                    isLoading: false, 
                    puzzle1: {
                        ...state.puzzle1, 
                        result
                    }
                }
            } else {
                return {
                    ...state, 
                    isLoading: false, 
                    puzzle2: {
                        ...state.puzzle2, 
                        result
                    }
                }
            }
        }

        default: {
            return state;
        }
    }
}