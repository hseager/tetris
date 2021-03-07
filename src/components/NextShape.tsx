import { useEffect, useRef } from 'react'
import GameManager from '../classes/GameManager'

interface NextShapeProps {
    game: GameManager,
    setGame: React.Dispatch<React.SetStateAction<GameManager>>
}

function NextShape({ game, setGame } : NextShapeProps){
    const nextShapeCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const width = 80
    const height = 80

    useEffect(() => {
        const nextShapeCanvas = nextShapeCanvasRef.current?.getContext('2d')
        if(nextShapeCanvas){
            game.nextShapeCanvas = nextShapeCanvas
            game.nextShape.context = nextShapeCanvas
            setGame(game)
        }
    },[])

    return (
        <canvas 
            ref={nextShapeCanvasRef}
            width={width}
            height={height}
            className="border-solid border-8 border-gray-300 bg-white rounded-md p-2 w-20 h-20" />
    )
}

export default NextShape