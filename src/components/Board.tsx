import { useEffect, useRef, useState } from 'react';
import Canvas from '../classes/Canvas'

function Board() {
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [columns, setColumns] = useState(10)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(400)
    const [blockSize, setBlockSize] = useState(width / columns)
    const [playing, setPlaying] = useState(false)

    const play = () => {
        setPlaying(true)
    }

    useEffect(() => {
        const canvasElement = canvasRef.current
        const context = canvasElement?.getContext('2d')
        if(canvasElement && context){
            const canvas = new Canvas(context, width, height, blockSize)
            canvas.init()
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