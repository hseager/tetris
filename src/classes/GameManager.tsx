import Shape from './Shape'

class GameManager {
    context: CanvasRenderingContext2D
    width: number
    height: number
    blockSize: number
    currentShape: Shape
    lineColor = '#ddd'
    
    constructor(canvasContext: CanvasRenderingContext2D, width: number, height: number, blockSize: number){
        this.context = canvasContext
        this.width = width
        this.height = height
        this.blockSize = blockSize
        this.currentShape = new Shape(this.context, 80, 0)
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
        window.requestAnimationFrame(() => { this.gameLoop() })
    }
    gameLoop(){
        this.clearCanvas()

        this.currentShape.update()
        this.currentShape.draw()
        
        window.requestAnimationFrame(() => { this.gameLoop() })
    }
    clearCanvas(){
        this.context.clearRect(0, 0, this.width, this.height)
    }
}

export default GameManager