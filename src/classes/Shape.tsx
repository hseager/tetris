import Position from './Position'
import ShapeManager from './ShapeManager'
import Block from './Block'

class Shape {
    context: CanvasRenderingContext2D | null
    blockSize: number
    type: number
    rotation: number
    blocks: Array<Block>
    color: string
    private _position: Position
    private strokeSize = 2
    private strokeColor = '#333'

    constructor(context: CanvasRenderingContext2D | null, position: Position, blockSize: number){
        this.context = context
        this.blockSize = blockSize
        this.type = ShapeManager.getRandomShapeType()
        this.rotation = 0
        this.blocks = this.createBlocks()
        this.color = ShapeManager.getShapeColor(this.type)
        this._position = position
        this.position = position
    }
    get position(){
        return this._position
    }
    set position(position: Position){
        this.blocks.forEach(block => { block.shapePosition = position })
        this._position = position
    }
    draw(){
        if(!this.context) return
        this.context.fillStyle = this.color
        this.blocks.forEach(block => {
            if(this.context){
                this.context.beginPath()
                this.context.rect(block.position.x, block.position.y, this.blockSize, this.blockSize)
                this.context.fill()
                this.context.lineWidth = this.strokeSize
                this.context.strokeStyle = this.strokeColor
                this.context.stroke()
            }
        })
    }
    createBlocks(){
        const shapeData = ShapeManager.getShape(this.type)
        const blockData = shapeData.rotations[this.rotation]
        let blocks: Array<Block> = []
        blockData.forEach((row, y) => {
            row.forEach((column, x) => {
                if(column)
                    blocks.push(new Block(this.position, this.blockSize, x, y))
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