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
    draw(){
        if(!this.context) return
        this.context.fillStyle = this.color
        this.blocks.forEach(block => {
            this.context?.fillRect(block.x, block.y, this.blockSize, this.blockSize)
        })
    }
    update({ x = this.x, y = this.y }: Position){
        this.blocks.forEach(block => {
            block.x += (x - this.x)
            block.y += (y - this.y)
        })
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
        return blocks
    }
    rotate(){
        const shapeData = ShapeManager.getShape(this.type)
        const rotation = shapeData.rotations[this.rotation]
        if(rotation) 
            this.rotation++
        else
            this.rotation = 0
        
    }
}

export default Shape