import GameObject from './GameObject'

class Block extends GameObject {
    constructor(context: CanvasRenderingContext2D | null, x: number, y: number){
        super(context, x, y)
    }
}

export default Block