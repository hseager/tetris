import { useEffect, useRef, useState } from 'react'
import GameManager from '../classes/GameManager'

type BoardProps = {
    setGame: React.Dispatch<React.SetStateAction<GameManager | null>>
}

function Board({ setGame } : BoardProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [columns, setColumns] = useState(10)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(400)
    const [blockSize, setBlockSize] = useState(width / columns)

    useEffect(() => {
        const canvasElement = canvasRef.current
        const canvasContext = canvasElement?.getContext('2d')
        if(canvasElement && canvasContext){
            const game = new GameManager(canvasContext, width, height, blockSize)
            game.init()
            setGame(game)
        }
    },[])

    return (
        <canvas 
            ref={canvasRef} 
            width={width} 
            height={height} 
            className="border-solid border-8 border-gray-300 bg-white rounded-md mb-6" 
            data-testid="canvas-element" />
    )
}

export default Board