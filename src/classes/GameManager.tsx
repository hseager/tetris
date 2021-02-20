import Shape from './Shape'
import Controls from './Controls'

class GameManager {
    context: CanvasRenderingContext2D
    width: number
    height: number
    blockSize: number
    currentShape: Shape
    private oldTimeStamp: number
    private timePassed: number
    gameSpeed: number
    lastTick: number
    shapes: Array<Shape>

    lineColor = '#ddd'
    
    constructor(canvasContext: CanvasRenderingContext2D, width: number, height: number, blockSize: number){
        this.context = canvasContext
        this.width = width
        this.height = height
        this.blockSize = blockSize
        this.currentShape = new Shape(this.context, 80, -60)
        this.oldTimeStamp = 0
        this.timePassed = 0
        this.gameSpeed = 0.3
        this.lastTick = 0
        this.shapes = [this.currentShape]
    }
    init(){
        // this.drawGrid()
    }
    drawGridLine(x: number, y: number, length: number , type: 'horizontal'|'vertical'){
        this.context.beginPath()
        this.context.moveTo(x, y)
        if(type === 'vertical')
            this.context.lineTo(x, length)
        else
            this.context.lineTo(length, y)
        this.context.strokeStyle = this.lineColor
        this.context.stroke()
    }
    drawGrid(){
        // Draw vertical lines
        for(let lineY = 0; lineY <= this.width; lineY += this.blockSize){
            this.drawGridLine(lineY, 0, this.height, 'vertical')
        }
        // Draw horizontal lines
        for(let lineX = 0; lineX <= this.height; lineX += this.blockSize){
            this.drawGridLine(0, lineX, this.width, 'horizontal')
        }
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
                this.currentShape = new Shape(this.context, 80, -60)
                this.shapes.push(this.currentShape)
            }

            this.lastTick = this.timePassed + this.gameSpeed
        }
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) })
    }
    clearCanvas(){
        this.context.clearRect(0, 0, this.width, this.height)
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
        let position = {}
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

        if(!this.detectCollision()){
            this.clearCanvas()
            this.currentShape.update(position)
            this.drawShapes()
        }
    }
}

export default GameManager