import Shape from './Shape'

class GameManager {
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    blockSize: number
    lineColor = '#ddd'

    constructor(canvasContext: CanvasRenderingContext2D, width: number, height: number, blockSize: number){
        this.ctx = canvasContext
        this.width = width
        this.height = height
        this.blockSize = blockSize
    }
    init(){
        this.drawGrid()
    }
    drawGridLine(x: number, y: number, length: number , type: 'horizontal'|'vertical'){
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        if(type === 'vertical')
            this.ctx.lineTo(x, length)
        else
            this.ctx.lineTo(length, y)
        this.ctx.strokeStyle = this.lineColor
        this.ctx.stroke()
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
        const shape = new Shape()
        this.ctx.fillStyle = shape.color
        this.ctx.fill(shape)
    }
}

export default GameManager