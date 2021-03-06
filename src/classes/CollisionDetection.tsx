import Position from './Position'
import Shape from './Shape'
const isEqual = require('lodash/isEqual')
const clone = require('lodash/cloneDeep')

class CollisionDetection {
    static detectCollision(nextMove: Position, currentShape: Shape, pile: Array<Shape>, width: number, height: number): boolean {
        let nextMoveShape: Shape = clone(currentShape)
        nextMoveShape.position = nextMove

        if(CollisionDetection.collidingWithPile(nextMoveShape, pile)
            || CollisionDetection.collidingWithFloor(nextMoveShape, height)
            || CollisionDetection.collidingWithWalls(nextMoveShape, width))
            return true
        else
            return false
    }    
    static collidingWithPile(shape: Shape, pile: Array<Shape>): boolean {
        if(pile.length === 0) return false
        let colliding = false
        pile.forEach(pileShape => {
            pileShape.blocks.forEach(pileBlock => {
                if(shape.blocks.some(block => isEqual(block.position, pileBlock.position)))
                    colliding = true
            })
        })

        return colliding
    }
    static collidingWithFloor(shape: Shape, height: number): boolean {
        if(shape.blocks.some(block => block.position.y >= height))
            return true

        return false
    }
    static collidingWithWalls(shape: Shape, width: number){
        if(shape.blocks.some(block => block.position.x >= width || block.position.x < 0))
            return true
        
        return false
    }
}

export default CollisionDetection