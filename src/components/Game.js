import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      stepIndex: 0,
      locationHistory: [],
    }
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // removing the future nums in the array
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]){ // this step ends game if there is already a winner
      // console.log("move exists")
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let currentSpot = this.coordinate(i);
    this.state.locationHistory.push(currentSpot);
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      stepIndex: i,
      locationHistory: this.state.locationHistory,
    });
    console.log([...this.state.locationHistory, currentSpot])
    console.log(this.state.locationHistory);
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

    coordinate = (i) => {  
      let pointArr = [];
       for(let row = 1; row < 4; row++){
        for(let col = 1; col < 4; col++){
          let colRow = {
            colNum: col,
            rowNum: row,
          };
          pointArr.push(colRow);
        }
       }
       console.log(pointArr[i])
       return pointArr[i];
    }

  render() {
    const history = this.state.history;
    console.log(this.state)
    // let col = this.state.locationHistory[0].colNum;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const moves = history.map((step, move) => {

      let spot = "";
      if (move !== 0) {
        spot = this.state.locationHistory[move - 1];
      }
      console.log(`move: ${JSON.stringify(move)}`)

      console.log(`spot: ${JSON.stringify(spot)}`)
      const desc = move ? 
        `Go to move # ${move} (${spot.colNum})(${spot.rowNum})`:
        'Go to game start';
      return (
        <li key={move} >
          <button onClick={() => this.jumpTo(move)} >{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = `Winner ${winner}`
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            handleClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

/*
Display the location for each move in the format (col, row) in the move history list.
Bold the currently selected item in the move list.
Rewrite Board to use two loops to make the squares instead of hardcoding them.
Add a toggle button that lets you sort the moves in either ascending or descending order.
When someone wins, highlight the three squares that caused the win.
When no one wins, display a message about the result being a draw.
*/