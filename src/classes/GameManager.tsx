import Shape from './Shape'
import Controls from './Controls'
import Position from './Position'
import CollisionDetection from './CollisionDetection'
const clone = require('lodash/cloneDeep')

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
    private nextShapeStartingPosition: Position = { x: 0, y: 0 }

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
            let nextMoveShape: Shape = clone(this.currentShape)
            nextMoveShape.position = { x: this.currentShape.position.x, y: this.currentShape.position.y + this.blockSize }

            if(!CollisionDetection.detectCollision(nextMoveShape, this.pile, this.width, this.height)){
                this.updateBoard(nextMoveShape)
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
    updateBoard(shape: Shape){
        this.clearCanvas()
        this.currentShape = shape
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
    moveShape(direction: number){
        let nextMove: Position = {...this.currentShape.position}
        let nextMoveShape: Shape = clone(this.currentShape)
        switch (direction){
            case Controls.MoveDirection.Up:
                nextMoveShape.rotate()
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
        nextMoveShape.position = nextMove

        if(!CollisionDetection.detectCollision(nextMoveShape, this.pile, this.width, this.height))
            this.updateBoard(nextMoveShape)
    }
}

export default GameManager