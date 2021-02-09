import { useEffect, useRef, useState } from 'react';

function Board() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [columns, setColumns] = useState(10)
    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(400)
    const [blockSize, setBlockSize] = useState(width / columns)

    const drawLine = (ctx: CanvasRenderingContext2D, x: number, y: number, length: number , type: 'horizontal'|'vertical') => {
        ctx.beginPath()
        ctx.moveTo(x, y)
        if(type === 'vertical')
            ctx.lineTo(x, length)
        else
            ctx.lineTo(length, y)
        ctx.strokeStyle = '#ddd'
        ctx.stroke()
    }

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        for(let lineY = 0; lineY <= width; lineY += blockSize){
            drawLine(ctx, lineY, 0, height, 'vertical')
        }
        for(let lineX = 0; lineX <= height; lineX += blockSize){
            drawLine(ctx, 0, lineX, width, 'horizontal')
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
        <canvas ref={canvasRef} width={width} height={height} className="border-solid border-8 border-gray-300 bg-white rounded-md" />
    )
}

export default Board