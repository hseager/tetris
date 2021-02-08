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
        ctx.translate(-canvasOffset, -canvasOffset)
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height + canvasOffset)
        ctx.strokeStyle = '#ccc'
        ctx.stroke()
    }

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        for(let i = 0; i <= width; i + blockSize){
            console.log(i)
        }
        drawLine(ctx, blockSize, 0)
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