import GameObject from './GameObject'
import Position from './Position'
import shapes from '../data/shapes'

class Shape extends GameObject {
    color = 'red'
    shapes = []
    blockSize: number
    width: number
    height: number
    layout: Array<Array<number>>
    rotation: number
    constructor(context: CanvasRenderingContext2D | null, x: number, y: number, blockSize: number){
        super(context, x, y)
        this.blockSize = blockSize
        this.width = blockSize * 3
        this.height = blockSize * 2
        this.rotation = 0
        this.layout = shapes[2].rotations[this.rotation]
    }
    draw(){
        if(!this.context) return
        // this.context.fillRect(this.x, this.y, this.width, this.height)

        this.context.fillStyle = this.color
        this.context.fillRect(this.x, this.y, this.blockSize, this.blockSize)
        this.context.fillRect(this.x + this.blockSize, this.y, this.blockSize, this.blockSize)
        this.context.fillRect(this.x + this.blockSize * 2, this.y, this.blockSize, this.blockSize)
        this.context.fillRect(this.x + this.blockSize * 2, this.y + this.blockSize, this.blockSize, this.blockSize)

        /*
        this.context.fillStyle = this.color
        this.context.beginPath()
        this.context.moveTo(this.x, this.y)
        this.context.lineTo(this.x + this.blockSize, this.y)
        this.context.lineTo(this.x + this.blockSize, this.y + this.blockSize * 4)
        this.context.lineTo(this.x, this.y + this.blockSize * 4)
        this.context.fill()
        */
    }
    update({ x = this.x, y = this.y }: Position){
        this.x = x
        this.y = y
    }
}

export default Shape