import Position from './Position'

class Block {
    shapePosition: Position
    blockSize: number
    x: number
    y: number
    constructor(shapePosition: Position, blockSize: number, x: number, y: number){
        this.shapePosition = shapePosition
        this.blockSize = blockSize
        this.x = x
        this.y = y
    }
    get position(): Position {
        return { x: this.shapePosition.x + this.blockSize * this.x, y: this.shapePosition.y + this.blockSize * this.y }
    }
}

export default Block