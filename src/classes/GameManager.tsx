import Shape from './Shape'
import Controls from './Controls'
import Position from './Position'
import CollisionDetection from './CollisionDetection'
const clone = require('lodash/cloneDeep')
const isEqual = require('lodash/isEqual')

class GameManager {
    boardContext: CanvasRenderingContext2D | null
    nextShapeCanvas: CanvasRenderingContext2D | null
    width: number
    height: number
    blockSize: number
    currentShape: Shape
    gameSpeed: number
    nextShape: Shape
    private oldTimeStamp: number
    private timePassed: number
    private lastTick: number
    private pile: Array<Shape>
    private currentShapeStartingPosition: Position = { x: 80, y: -60 }
    private nextShapeStartingPosition: Position = { x: 10, y: 10 }

    constructor(width: number, height: number, blockSize: number){
        this.boardContext = null
        this.nextShapeCanvas = null
        this.width = width
        this.height = height
        this.blockSize = blockSize
        this.currentShape = new Shape(this.boardContext, this.currentShapeStartingPosition, blockSize)
        this.nextShape = new Shape(this.nextShapeCanvas, this.nextShapeStartingPosition, blockSize)
        this.oldTimeStamp = 0
        this.timePassed = 0
        this.gameSpeed = 0.3
        this.lastTick = 0
        this.pile = []
    }
    start(){
        window.requestAnimationFrame((timeStamp) => { 
            this.oldTimeStamp = timeStamp
            this.gameLoop(timeStamp)
        })
    }
    gameLoop(timeStamp: number){
        const secondsPassed = Math.round(timeStamp - this.oldTimeStamp) / 1000
        this.oldTimeStamp = timeStamp
        this.timePassed += secondsPassed

        if(this.timePassed >= this.lastTick){
            let nextMove: Position = { x: this.currentShape.position.x, y: this.currentShape.position.y + this.blockSize }
            
            if(!this.detectCollision(nextMove)){
                this.updateBoard(nextMove)
            } else {
                this.createNewShape()
            }

            this.lastTick = this.timePassed + this.gameSpeed
        }
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) })
    }
    createNewShape(){
        this.pile.push(this.currentShape)
        this.currentShape = this.nextShape
        this.currentShape.context = this.boardContext
        this.currentShape.position = this.currentShapeStartingPosition
        this.nextShape = new Shape(this.nextShapeCanvas, this.nextShapeStartingPosition, this.blockSize)
    }
    updateBoard(nextMove: Position){
        this.clearCanvas()
        this.currentShape.position = nextMove
        this.drawShapes()
    }
    clearCanvas(){
        this.boardContext?.clearRect(0, 0, this.width, this.height)
        this.nextShapeCanvas?.clearRect(0, 0, this.width, this.height)
    }
    drawShapes(){
        this.nextShape.draw()
        this.currentShape.draw()
        this.pile.forEach(shape => {
            shape.draw()
        })
    }
    detectCollision(nextMove: Position): boolean {
        let nextMoveShape: Shape = clone(this.currentShape)
        nextMoveShape.position = nextMove

        if(CollisionDetection.collidingWithPile(nextMoveShape, this.pile) || CollisionDetection.collidingWithFloor(nextMoveShape, this.height))
            return true
        else
            return false
    }
    moveShape(direction: number){
        let nextMove: Position = {...this.currentShape.position}
        switch (direction){
            case Controls.MoveDirection.Up:
                this.currentShape.rotate()
                break
            case Controls.MoveDirection.Down:
                nextMove.y = nextMove.y + this.blockSize
                break
            case Controls.MoveDirection.Left:
                nextMove.x = nextMove.x - this.blockSize
                break
            case Controls.MoveDirection.Right:
                nextMove.x = nextMove.x + this.blockSize
                break
        }

        if(!this.validMovement(nextMove)) return

        if(!this.detectCollision(nextMove)){
            this.updateBoard(nextMove)
        }
    }
    validMovement(nextMove: Position): boolean{
        let nextMoveShape: Shape = clone(this.currentShape)
        nextMoveShape.position = nextMove
        
        if(nextMove.x < 0)
            return false

        if(nextMoveShape.blocks.some(block => block.position.x >= this.width))
            return false

        if(CollisionDetection.collidingWithPile(nextMoveShape, this.pile))
            return false

        return true
    }
}

export default GameManager