import React from 'react';
import ReactDOM from 'react-dom/client';
import './tuto-reactjs.css';

function calculateWinner(squares) {
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
            return {
                winner: squares[a],
                line: [a, b, c],
            }
        }
    }
    return null;
}

function Square(props) {
    return (
        <button className={props.winner?'square win':'square'} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        let winner;
        if(this.props.winner) {
            winner=this.props.winner.line.includes(i) ? true : false;
        }

        return (
            <Square
                winner={winner}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
            let items = [];
            let count = 0

            for(let i = 0;i < 3; i++) {
                let subItems = [];
                for (let j = 0; j < 3; j++) {
                    subItems.push(this.renderSquare(count));
                    count++;
                }
                items.push(<div className='board-row'>{subItems}</div>);
            }

            return (<div>{items}</div>)
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:  [{
                squares: Array(9).fill(null),
                lastSquare: null,
            }],
            xIsNext: true,
            stepNumber: 0,
            reversed: false,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    switchSort() {
        this.setState({
            reversed: this.state.reversed ? false : true,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]!=null) {
            return;
        }

        squares[i] = this.state.xIsNext?'X':'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                lastSquare: i,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        })
    }

    render() {
        const history = this.state.history;
        const current = this.state.history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const reversed = this.state.reversed?'reversed':'notreversed';

        const moves = history.map((step, move) => {
            let column = step.lastSquare % 3;
            let line = step.lastSquare<3 ? 0 : (step.lastSquare>2 && step.lastSquare<6 ? 1 : 2);
            let desc ='';

            desc = step.lastSquare!==null ?
                'Revenir au tour n°' + move + ' (' + step.lastSquare + ',' + column + ',' + line + ')' :
                'Revenir au début de la partie';

            return (
                <li key={move} >
                    <button className={move===this.state.stepNumber?'currentStep':'lastStep'} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = winner.winner + ' a gagné';
        } else {
            if(current.squares.includes(null)) {
                status = 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O');
            } else {
                status = 'Match nul !'
            }

        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winner={winner}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><button onClick={() => this.switchSort()}>{this.state.sort?'historical':'most recent'}</button></div>
                    <ol className={reversed}>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

