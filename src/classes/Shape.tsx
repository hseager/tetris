import GameObject from './GameObject'
import Position from './Position'
import ShapeManager from './ShapeManager'
import Block from './Block'

class Shape extends GameObject {
    color = 'red'
    blockSize: number
    type: number
    rotation: number
    blocks: Array<Block>
    constructor(context: CanvasRenderingContext2D | null, x: number, y: number, blockSize: number){
        super(context, x, y)
        this.blockSize = blockSize
        this.type = ShapeManager.getRandomShapeType()
        this.rotation = 0
        this.blocks = ShapeManager.buildShape(this.type, this.rotation)
    }
    get width(){
        let width = 0
        this.blocks.map(block => {
            width = block.x >= width ? block.x : width
        })
        return (width + 1) * this.blockSize
    }
    get height(){
        let height = 0
        this.blocks.map(block => {
            height = block.y >= height ? block.y : height
        })
        return (height + 1) * this.blockSize
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