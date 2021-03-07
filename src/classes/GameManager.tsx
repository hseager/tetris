import Shape from './Shape'
import Controls from './Controls'
import Position from './Position'
import CollisionDetection from './CollisionDetection'
import GameEvents from './GameEvents'
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
    private playing: boolean
    private oldTimeStamp: number
    private timePassed: number
    private lastTick: number
    private pile: Array<Shape>
    private currentShapeStartingPosition: Position = { x: 80, y: -60 }
    private nextShapeStartingPosition: Position = { x: 10, y: 0 }
    private animationFrameId: number | null

    constructor(width: number, height: number, blockSize: number, playing: boolean){
        this.boardContext = null
        this.nextShapeCanvas = null
        this.width = width
        this.height = height
        this.blockSize = blockSize
        this.currentShape = new Shape(this.boardContext, this.currentShapeStartingPosition, blockSize)
        this.nextShape = new Shape(this.nextShapeCanvas, this.nextShapeStartingPosition, blockSize)
        this.playing = playing
        this.oldTimeStamp = 0
        this.timePassed = 0
        this.gameSpeed = 0.3
        this.lastTick = 0
        this.pile = []
        this.animationFrameId = null
    }
    start(){
        GameEvents.setPlaying(true)
        this.playing = true
        this.animationFrameId = window.requestAnimationFrame((timeStamp) => { 
            this.oldTimeStamp = timeStamp
            this.gameLoop(timeStamp)
        })
    }
    stop(){
        GameEvents.setPlaying(false)
        this.playing = false
        if(this.animationFrameId)
            window.cancelAnimationFrame(this.animationFrameId)
        
        if(this.boardContext){
            this.boardContext.fillStyle = 'rgba(0, 0, 0, 0.3)'
            this.boardContext.fillRect(0, 0, this.width, this.height)
        }
    }
    gameLoop(timeStamp: number){
        if(!this.playing) return
        const secondsPassed = Math.round(timeStamp - this.oldTimeStamp) / 1000
        this.oldTimeStamp = timeStamp
        this.timePassed += secondsPassed

        if(this.timePassed >= this.lastTick){
            let nextMoveShape: Shape = clone(this.currentShape)
            nextMoveShape.position = { x: this.currentShape.position.x, y: this.currentShape.position.y + this.blockSize }

            if(!CollisionDetection.detectCollision(nextMoveShape, this.pile, this.width, this.height)){
                this.updateBoard(nextMoveShape)
            } else {
                if(!this.gameOver()){
                    this.pile.push(this.currentShape)
                    this.checkRows()
                    this.swapNextShape()
                } else {
                    this.stop()
                }
            }

            this.lastTick = this.timePassed + this.gameSpeed
        }
        this.animationFrameId = window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) })
    }
    gameOver(): boolean {
        if(this.currentShape.blocks.some(block => block.position.y <= 0))
            return true
        return false
    }
    checkRows(){
        const rows = this.currentShape.blocks.map(block => block.position.y).filter((value, index, self) => self.indexOf(value) === index)
        rows.forEach(row => {
            let counter = 0
            this.pile.forEach(shape => {
                shape.blocks.forEach(block => {
                    if(block.position.y === row)
                        counter += this.blockSize
                })
            })
            if(counter === this.width)
                this.clearRow(row)
        })
    }
    clearRow(row: number){
        this.pile.forEach(shape => {
            let newBlocks = shape.blocks.filter(block => block.position.y !== row)
            newBlocks.forEach(block => {
                if(block.position.y < row)
                    block.relativeY++
            })
            shape.blocks = newBlocks
        })
    }
    swapNextShape(){
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
        if(!this.playing) return
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