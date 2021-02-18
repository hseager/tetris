import Shape from './Shape'

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

    lineColor = '#ddd'
    
    constructor(canvasContext: CanvasRenderingContext2D, width: number, height: number, blockSize: number){
        this.context = canvasContext
        this.width = width
        this.height = height
        this.blockSize = blockSize
        this.currentShape = new Shape(this.context, 80, -60)
        this.oldTimeStamp = 0
        this.timePassed = 0
        this.gameSpeed = 0.5
        this.lastTick = 0
    }
    init(){
        this.drawGrid()
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

        // Create the game tick here
        if(this.timePassed >= this.lastTick){
            if(this.currentShape.y + this.currentShape.height >= this.height)
                this.currentShape.isColliding = true

            if(!this.currentShape.isColliding){
                this.clearCanvas()
                this.currentShape.update(this.blockSize)
                this.currentShape.draw()
            }

            this.lastTick = this.timePassed + this.gameSpeed
        }
        
        window.requestAnimationFrame((timeStamp) => { this.gameLoop(timeStamp) })
    }
    clearCanvas(){
        this.context.clearRect(0, 0, this.width, this.height)
    }
}

export default GameManager