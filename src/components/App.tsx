import { useState } from 'react'
import Board from './Board'
import Controls from '../classes/Controls'
import GameManager from '../classes/GameManager'

function App() {
    const [score, setScore] = useState(0)
    const [game, setGame] = useState<GameManager | null>(null)
    const [playing, setPlaying] = useState(false)

    const play = () => {
        setPlaying(true)
        game?.start()
        document.addEventListener('keydown', onKeyPressed)
    }

    const onKeyPressed = (e: KeyboardEvent) => {
        switch (e.key){
            case Controls.upKeys.find(k => k === e.key):
                game?.moveShape(Controls.MoveDirection.Up)
                break
            case Controls.downKeys.find(k => k === e.key):
                game?.moveShape(Controls.MoveDirection.Down)
                break
            case Controls.leftKeys.find(k => k === e.key):
                game?.moveShape(Controls.MoveDirection.Left)
                break
            case Controls.rightKeys.find(k => k === e.key):
                game?.moveShape(Controls.MoveDirection.Right)
                break
        }
    }

    return (
        <div className="container">
            <h1 className="pt-4">Tetris</h1>
            <p className="py-2">Score: {score}</p>
            <Board setGame={setGame}/>
            {
                !playing && <button className="btn" onClick={play}>Play</button>
            }
        </div>
    );
}

export default App