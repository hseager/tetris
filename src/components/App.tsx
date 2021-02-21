import { useState, useRef, useEffect } from 'react'
import Board from './Board'
import NextShape from './NextShape'
import Controls from '../classes/Controls'
import GameManager from '../classes/GameManager'

function App() {
    const [score, setScore] = useState(0)
    const [playing, setPlaying] = useState(false)
    
    const [columns, setColumns] = useState(10)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(400)
    const [blockSize, setBlockSize] = useState(width / columns)
    const [game, setGame] = useState<GameManager>(new GameManager(width, height, blockSize))
    
    const play = () => {
        setPlaying(true)
        game.start()
        document.addEventListener('keydown', onKeyPressed)
    }

    const onKeyPressed = (e: KeyboardEvent) => {
        switch (e.key){
            case Controls.upKeys.find(k => k === e.key):
                game.moveShape(Controls.MoveDirection.Up)
                break
            case Controls.downKeys.find(k => k === e.key):
                game.moveShape(Controls.MoveDirection.Down)
                break
            case Controls.leftKeys.find(k => k === e.key):
                game.moveShape(Controls.MoveDirection.Left)
                break
            case Controls.rightKeys.find(k => k === e.key):
                game.moveShape(Controls.MoveDirection.Right)
                break
        }
    }

    return (
        <div className="container">
            <h1 className="pt-4">Tetris</h1>
            <p className="py-2">Score: {score}</p>
            <div className="flex items-start">
                <Board game={game} setGame={setGame} />
                <NextShape shape={game.nextShape}/>
            </div>
            {
                !playing && <button className="btn" onClick={play}>Play</button>
            }
        </div>
    );
}

export default App