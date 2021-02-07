import { useEffect, useRef } from 'react';

function Board() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if(canvas && context){
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.fillStyle = '#fff'
        }
    })

    return (
        <>
            <canvas ref={canvasRef} width="200" height="400" className="bg-gray-200 border-solid border-4 border-gray-300" />
        </>
    )
}

export default Board