import GameObject from './GameObject'
import Position from './Position'
import ShapeBuilder from './ShapeBuilder'
import Block from './Block'

class Shape extends GameObject {
    color = 'red'
    shapes = []
    blockSize: number
    width: number
    height: number
    name: string
    rotation: number
    blocks: Array<Block>
    constructor(context: CanvasRenderingContext2D | null, x: number, y: number, blockSize: number){
        super(context, x, y)
        this.blockSize = blockSize
        this.name = 'J'
        this.rotation = 0
        this.blocks = ShapeBuilder.buildShape(this.name, this.rotation)
        this.width = blockSize * 3
        this.height = blockSize * 2
    }
    draw(){
        if(!this.context) return
        this.context.fillStyle = this.color
        this.blocks.map(block => {
            this.context?.fillRect(this.x + this.blockSize * block.x, this.y + this.blockSize * block.y, this.blockSize, this.blockSize)
        })
    }
    update({ x = this.x, y = this.y }: Position){
        this.x = x
        this.y = y
    }
}

export default Shape