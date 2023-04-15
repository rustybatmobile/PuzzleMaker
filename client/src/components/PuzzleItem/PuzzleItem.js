import "./PuzzleItem.css";

const PuzzleItem = ({question, input, result, problemType}) => {
    
    return (
        <div className="puzzle-list">
          <div className="puzzle-item">
            <div className="puzzle-image">
              {/* <img src= {puzzleImageUrl} alt="Puzzle" /> */}
              <span className="puzzle-id">#12345</span>
            </div>
            <div style = {{
                display: "flex", 
                flexDirection: "column", 
                
            }}>
                <div className="puzzle-description">
                    {question}
                </div>
                <div className="puzzle-numbers">
                    {problemType == "1" ? (
                        <>
                            <span>A: {input[0]}</span>
                            <span>B: {input[1]}</span>
                        </>
                    ) : 
                    <div>
                        {input}
                    </div> 
                }
                </div>
                <div className="puzzle-result">
                <span>Result:</span>
                <input type="text" value= {result} readOnly />
                </div>
            </div>
          </div>
        </div>
      );
}

export default PuzzleItem;