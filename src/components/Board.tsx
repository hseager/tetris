import { useEffect, useRef, useState } from 'react';
import GameManager from '../classes/GameManager'

function Board() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [columns, setColumns] = useState(10)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(400)
    const [blockSize, setBlockSize] = useState(width / columns)
    const [playing, setPlaying] = useState(false)
    const [game, setGame] = useState<GameManager | null>(null)

    const play = () => {
        setPlaying(true)
        game?.start()
    }

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
        <div>
            <canvas ref={canvasRef} width={width} height={height} className="border-solid border-8 border-gray-300 bg-white rounded-md mb-6" data-testid="canvas-element" />
            {
                !playing && <button className="btn" onClick={play}>Play</button>
            }
        </div>
    )
}

export default Board