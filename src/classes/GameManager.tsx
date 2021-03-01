import Shape from './Shape'
import Controls from './Controls'
import Position from './Position'
import GameEvents from './GameEvents'

class GameManager {
    boardContext: CanvasRenderingContext2D | null
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

    constructor(width: number, height: number, blockSize: number){
        this.boardContext = null
        this.width = width
        this.height = height
        this.blockSize = blockSize
        this.currentShape = new Shape(this.boardContext, 80, -60, blockSize)
        this.nextShape = new Shape(this.boardContext, 80, -60, blockSize)
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
            let nextMove: Position = { y: this.currentShape.y + this.blockSize }
            
            if(!this.detectCollision(nextMove)){
                this.clearCanvas()
                this.currentShape.update(nextMove)
                this.drawShapes()
            } else {
                this.pile.push(this.currentShape)
                this.currentShape = this.nextShape
                this.nextShape = new Shape(this.boardContext, 80, -60, this.blockSize)
                GameEvents.changeNextShape(this.nextShape)
            }

            this.lastTick = this.timePassed + this.gameSpeed
        }
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) })
    }
    clearCanvas(){
        this.boardContext?.clearRect(0, 0, this.width, this.height)
    }
    drawShapes(){
        this.currentShape.draw()
        this.pile.forEach(shape => {
            shape.draw()
        })
    }
    detectCollision(nextMove: Position): boolean{
        if(this.collidingWithPile(nextMove) || this.collidingWithFloor(nextMove))
            return true
        else
            return false
    }
    collidingWithPile(nextMove: Position): boolean{
        if(this.pile.length === 0) return false
        let colliding = false
        this.pile.forEach(pileShape => {
            pileShape.blocks.forEach(pileBlock => {
                this.currentShape.blocks.forEach(block => {
                    if(nextMove.y)
                        if(block.x === pileBlock.x && block.y + (nextMove.y - this.currentShape.y) === pileBlock.y)
                            colliding = true
                })
            })
        })
        return colliding
    }
    collidingWithFloor(nextMove: Position): boolean{
        let colliding = false
        this.currentShape.blocks.forEach(block => {
            if(nextMove.y && block.y + (nextMove.y - this.currentShape.y) >= this.height)
                colliding = true
        })
        return colliding
    }
    moveShape(direction: number){
        let nextMove: Position = {}
        switch (direction){
            case Controls.MoveDirection.Up:
                // Rotate
                break
            case Controls.MoveDirection.Down:
                nextMove = { y: this.currentShape.y + this.blockSize }
                break
            case Controls.MoveDirection.Left:
                nextMove = { x: this.currentShape.x - this.blockSize }
                break
            case Controls.MoveDirection.Right:
                nextMove = { x: this.currentShape.x + this.blockSize }
                break
        }

        if(!this.validMovement(nextMove)) return

        if(!this.detectCollision(nextMove)){
            this.clearCanvas()
            this.currentShape.update(nextMove)
            this.drawShapes()
        }
    }
    validMovement(nextMove: Position): boolean{
        let validMove = true
        if(nextMove.x && nextMove.x <= 0)
            validMove = false

        this.currentShape.blocks.forEach(block => {
            if(nextMove.x && block.x + (nextMove.x - this.currentShape.x) >= this.width)
                validMove = false
        })

        this.pile.forEach(pileShape => {
            pileShape.blocks.forEach(pileBlock => {
                this.currentShape.blocks.forEach(block => {
                    if(nextMove.x)
                        if(block.y === pileBlock.y && block.x + (nextMove.x - this.currentShape.x) <= pileBlock.x)
                            validMove = false
                })
            })
        })
        
        return validMove
    }
}

export default GameManager