import Shape from './Shape'
import Controls from './Controls'
import Position from './Position'

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
        this.currentShape = new Shape(this.boardContext, 80, 20, blockSize)
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
                this.currentShape = new Shape(this.boardContext, 80, -60, this.blockSize)
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
        if(this.collidingWithPile(nextMove) || this.collidingWithFloor(nextMove)){
            this.currentShape.isColliding = true
            return true
        } else {
            return false
        }
            
    }
    collidingWithPile(nextMove: Position): boolean{
        if(this.pile.length === 0) return false

        let colliding = false
        this.pile.forEach(pileShape => {
            pileShape.blocks.forEach(pileBlock => {
                this.currentShape.blocks.forEach(block => {
                    if(nextMove.y){
                        if(block.x === pileBlock.x && block.y >= pileBlock.y){
                            colliding = true
                        }
                    }
                })
            })
        })

        return colliding
    }
    collidingWithFloor(nextMove: Position): boolean{
        return this.currentShape.blocks.some(block => block.y >= this.height)
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

        // Check board x boundaries
        // if(nextMove.x && nextMove.x + this.currentShape.width > this.width || nextMove.x && nextMove.x < 0) return

        //this.detectCollision(nextMove)
        if(this.currentShape.isColliding) return

        this.clearCanvas()
        this.currentShape.update(nextMove)
        this.drawShapes()
    }
}

export default GameManager