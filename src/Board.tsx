import { useEffect, useRef, useState } from 'react';

function Board() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const columns = useState(10)
    const rows = useState(20)

    const drawGrid = (ctx: CanvasRenderingContext2D) => {

    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if(canvas && context){
            drawGrid(context)
        }
    },[])

    return (
        <canvas ref={canvasRef} width="200" height="400" className="border-solid border-4 border-gray-300" />
    )
}

export default Board