import Position from './Position'

class Block {
    shapePosition: Position
    blockSize: number
    relativeX: number
    relativeY: number
    constructor(shapePosition: Position, blockSize: number, x: number, y: number){
        this.shapePosition = shapePosition
        this.blockSize = blockSize
        this.relativeX = x
        this.relativeY = y
    }
    get position(): Position {
        return { x: this.shapePosition.x + this.blockSize * this.relativeX, y: this.shapePosition.y + this.blockSize * this.relativeY }
    }
}

export default Block