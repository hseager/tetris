import Position from './Position'

class GameObject {
    context: CanvasRenderingContext2D | null
    position: Position
    isColliding: boolean
    constructor(context: CanvasRenderingContext2D | null, position: Position){
        this.context = context
        this.position = position
        this.isColliding = false
    }
}

export default GameObject