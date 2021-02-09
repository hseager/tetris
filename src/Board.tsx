import { useEffect, useRef, useState } from 'react';

function Board() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [columns, setColumns] = useState(10)
    const [rows, setRows] = useState(20)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(400)
    const [blockSize, setBlockSize] = useState(width / columns)

    const canvasOffset = 0.5

    const drawLine = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height + canvasOffset)
        ctx.strokeStyle = '#d1d5db'
        ctx.stroke()
    }

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        for(let lineY = 0; lineY <= width; lineY += blockSize){
            drawLine(ctx, lineY, 0)
        }
        
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if(canvas && context){
            drawGrid(context)
        }
    },[])

    return (
        <canvas ref={canvasRef} width={width} height={height} className="border-solid border-4 border-gray-300" />
    )
}

export default Board