import GameObject from './GameObject'
import Position from './Position'

class Block extends GameObject {
    constructor(context: CanvasRenderingContext2D | null, position: Position){
        super(context, position)
    }
}

export default Block