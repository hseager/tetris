import { useEffect, useRef, useState } from 'react'
import GameManager from '../classes/GameManager'

interface BoardProps {
    game: GameManager
    setGame: React.Dispatch<React.SetStateAction<GameManager>>
}

function Board({ game, setGame } : BoardProps) {
    const boardRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const boardContext = boardRef.current?.getContext('2d')
        if(boardContext){
            game.boardContext = boardContext
            game.currentShape.context = boardContext
            setGame(game)
        }
    },[])

    return (
        <canvas 
            ref={boardRef} 
            width={game.width} 
            height={game.height} 
            className="border-solid border-8 border-gray-300 bg-white rounded-md mb-6 mr-6" 
            data-testid="canvas-element" />
    )
}

export default Board