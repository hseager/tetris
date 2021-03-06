import Position from './Position'
import ShapeRepository from './ShapeRepository'
import Block from './Block'
import ShapeData from './ShapeData'

class Shape {
    context: CanvasRenderingContext2D | null
    blockSize: number
    data: ShapeData
    rotation: number
    blocks: Array<Block>
    color: string
    private _position: Position
    private strokeSize = 2
    private strokeColor = '#333'

    constructor(context: CanvasRenderingContext2D | null, position: Position, blockSize: number){
        this.context = context
        this.blockSize = blockSize
        this.data = ShapeRepository.getRandomShape()
        this.rotation = 0
        this.blocks = this.createBlocks()
        this.color = this.data.color
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
        const blockData = this.data.rotations[this.rotation]
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
        if(this.rotation < this.data.rotations.length - 1)
            this.rotation++
        else
            this.rotation = 0

        this.blocks = []
        this.blocks = this.createBlocks()
    }
}

export default Shape