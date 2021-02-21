import Shape from './Shape'
import Controls from './Controls'

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
    private shapes: Array<Shape>

    constructor(width: number, height: number, blockSize: number){
        this.boardContext = null
        this.width = width
        this.height = height
        this.blockSize = blockSize
        this.currentShape = new Shape(this.boardContext, 80, -60)
        this.oldTimeStamp = 0
        this.timePassed = 0
        this.gameSpeed = 0.3
        this.lastTick = 0
        this.shapes = [this.currentShape]
        this.nextShape = new Shape(this.boardContext, 80, -60)
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
            if(!this.detectCollision()){
                this.clearCanvas()
                this.currentShape.update({y: this.currentShape.y + this.blockSize})
                this.drawShapes()
            } else {
                this.currentShape = new Shape(this.boardContext, 80, -60)
                this.shapes.push(this.currentShape)
            }

            this.lastTick = this.timePassed + this.gameSpeed
        }
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) })
    }
    clearCanvas(){
        this.boardContext?.clearRect(0, 0, this.width, this.height)
    }
    drawShapes(){
        this.shapes.forEach(shape => {
            shape.draw()
        })
    }
    detectCollision(): boolean{
        let colliding = false
        // Colliding with shapes
        if(this.shapes.length > 0){
            this.shapes.forEach(shape => {
                if(shape.isColliding
                    && this.currentShape.x + this.currentShape.width > shape.x
                    && this.currentShape.x < shape.x + shape.width){

                    if(this.currentShape.y + this.currentShape.height >= shape.y){
                        this.currentShape.isColliding = true
                        colliding = true
                    }
                }
            })
        }
        // Colliding with floor
        if(this.currentShape.y + this.currentShape.height >= this.height){
            this.currentShape.isColliding = true
            colliding = true
        }

        return colliding
    }
    moveShape(direction: number){
        let position: any = {}
        switch (direction){
            case Controls.MoveDirection.Up:

                break
            case Controls.MoveDirection.Down:
                position = { y: this.currentShape.y + this.blockSize }
                break
            case Controls.MoveDirection.Left:
                position = { x: this.currentShape.x - this.blockSize }
                break
            case Controls.MoveDirection.Right:
                position = { x: this.currentShape.x + this.blockSize }
                break
        }

        // Check board x boundaries
        if(position.x + this.currentShape.width > this.width || position.x < 0) return

        if(!this.detectCollision()){
            this.clearCanvas()
            this.currentShape.update(position)
            this.drawShapes()
        }
    }
}

export default GameManager