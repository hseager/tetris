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
    constructor(context: CanvasRenderingContext2D | null, position: Position, blockSize: number){
        super(context, position)
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
            this.context?.fillRect(block.position.x, block.position.y, this.blockSize, this.blockSize)
        })
    }
    update(position: Position){
        this.blocks.forEach(block => {
            block.position.x += (position.x - this.position.x)
            block.position.y += (position.y - this.position.y)
        })
        this.position = position
    }
    createBlocks(){
        const shapeData = ShapeManager.getShape(this.type)
        const blockData = shapeData.rotations[this.rotation]
        let blocks: Array<Block> = []
        blockData.forEach((row, y) => {
            row.forEach((column, x) => {
                if(column)
                    blocks.push(new Block(this.context, { x: this.position.x + this.blockSize * x, y: this.position.y + this.blockSize * y }))
            })
        })
        return blocks
    }
    rotate(){
        const shapeData = ShapeManager.getShape(this.type)
        if(this.rotation < shapeData.rotations.length - 1)
            this.rotation++
        else
            this.rotation = 0

        this.blocks = []
        this.blocks = this.createBlocks()
    }
}

export default Shape