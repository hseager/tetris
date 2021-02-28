import GameObject from './GameObject'
import Position from './Position'
import ShapeManager from './ShapeManager'
import Block from './Block'

class Shape extends GameObject {
    color: string
    blockSize: number
    type: number
    rotation: number
    blocks: Array<Block>
    constructor(context: CanvasRenderingContext2D | null, x: number, y: number, blockSize: number){
        super(context, x, y)
        this.blockSize = blockSize
        this.type = ShapeManager.getRandomShapeType()
        this.rotation = 0
        this.blocks = this.createBlocks()
        this.color = ShapeManager.getShapeColor(this.type)
    }
    get width(){
        let width = 0
        this.blocks.forEach(block => {
            width = block.x >= width ? block.x : width
        })
        return (width + 1) * this.blockSize
    }
    get height(){
        let height = 0
        this.blocks.forEach(block => {
            height = block.y >= height ? block.y : height
        })
        return (height + 1) * this.blockSize
    }
    draw(){
        if(!this.context) return

        this.context.fillStyle = this.color
        this.blocks.forEach(block => {
            this.context?.fillRect(block.x, block.y, this.blockSize, this.blockSize)
        })
    }
    update({ x = this.x, y = this.y }: Position){
        this.x = x
        this.y = y
    }
    createBlocks(){
        const shapeData = ShapeManager.getShape(this.type)
        const blockData = shapeData.rotations[this.rotation]
        let blocks: Array<Block> = []
        blockData.forEach((row, y) => {
            row.forEach((column, x) => {
                if(column)
                    blocks.push(new Block(this.context, this.x + this.blockSize * x, this.y + this.blockSize * y))
            })
        })

        console.log(blocks)
        return blocks
    }
}

export default Shape