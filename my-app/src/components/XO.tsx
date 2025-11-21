import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';

const MainInlineStyle: React.CSSProperties = {
    display: '  flex',
    flexDirection: 'row',
    justifyContent: 'center',
}


interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

interface BoardProps {
    xIsNext: boolean;
    squares: (string | null)[];
    onPlay: (nextSquares: (string | null)[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'O';
        } else {
            nextSquares[i] = 'X';
        }
        onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner is: " + winner;
    } else {
        status = "Next players is: " + (xIsNext ? "O" : "X");
    }

    return (
        <>
            <div className="winner">{status}</div>
            <div className="game-board">
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
        </>
    );
};

function Game() {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];

    function handlePlay(nextSquares: (string | null)[]) {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }

    return (
        <>
            <div className="game">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

            </div>
        </>
    );
};
// export default Game;

function calculateWinner(squares: (string | null)[]): string | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const XO: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Game Page - SpyroNet</title>
                <link rel="stylesheet" href="style.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&display=swap" />
            </Helmet>

            <div>
                <header>
                    <section className="logo-section"><img src={photo} alt="logo" className="logo-image" /></section>
                    <section className="happy-worker-section"><p>Happy worker of the day: </p><RandomGenerator /></section>
                </header>

                <nav>
                    <ul className='nav-links'>
                        <li className='links'><Link to="/">Home</Link></li>
                        <li className='links'><Link to="/ToDo-List">To Do List</Link></li>
                        <li className='links'><Link to="/Quiz">Quiz</Link></li>
                        <li className='links'><Link to="/game">Games reservation</Link></li>
                        <li className='links'><Link to="/XO">XO Game</Link></li>
                        <li className='links'><Link to="/expenses">Expenses Tracker</Link></li>
                        <li className='links'><Link to="/t-shirts">Koszulki firmowe</Link></li>
                    </ul>
                </nav>

                <main>
                    <section style={MainInlineStyle} className="main-section">
                        {/* <div style={GamePartsInlineStyles}>
                            <Game />
                            <Game />
                        </div>
                        <div style={GamePartsInlineStyles}>
                            <Game />
                            <Game />
                        </div> */}
                        <Game />


                    </section>
                </main>
                <footer></footer>
            </div>
        </>
    );
};
export default XO;


