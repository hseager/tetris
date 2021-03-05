import Position from './Position'
import Shape from './Shape'
const clone = require('lodash/cloneDeep')

class CollisionDetection {
    static collidingWithPile(nextMove: Position, currentShape: Shape, pile: Array<Shape>): boolean {
        if(pile.length === 0) return false
        let colliding = false
        pile.forEach(pileShape => {
            pileShape.blocks.forEach(pileBlock => {
                if(currentShape.blocks.some(block => block.position.x === pileBlock.position.x && block.position.y + (nextMove.y - currentShape.position.y) === pileBlock.position.y))
                    colliding = true
            })
        })
        return colliding
    }
    static collidingWithFloor(nextMove: Position, currentShape: Shape, height: number): boolean {
        let testShape: Shape = clone(currentShape)
        testShape.position = nextMove

        if(testShape.blocks.some(block => block.position.y >= height))
            return true
        return false
    }
}

export default CollisionDetection