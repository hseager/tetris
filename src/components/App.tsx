import { useState } from 'react';
import Board from './Board'

function App() {
    const [score, setScore] = useState(0)

    return (
        <div className="container">
            <h1 className="pt-4">Tetris</h1>
            <p className="py-2">Score: {score}</p>
            <Board />
        </div>
    );
}

export default App;