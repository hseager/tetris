import Position from './Position'
import Shape from './Shape'
const clone = require('lodash/cloneDeep')
const isEqual = require('lodash/isEqual')

class CollisionDetection {
    static collidingWithPile(nextMove: Position, currentShape: Shape, pile: Array<Shape>): boolean {
        if(pile.length === 0) return false
        let colliding = false
        let testShape: Shape = clone(currentShape)
        testShape.position = nextMove
        
        pile.forEach(pileShape => {
            pileShape.blocks.forEach(pileBlock => {
                if(testShape.blocks.some(block => isEqual(block.position, pileBlock.position)))
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