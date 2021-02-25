import GameObject from './GameObject'
import Position from './Position'

const shapes = [
    {
        name: 'I',
        rotations: [
            [
                [1],
                [1],
                [1],
                [1]
            ],
            [
                [1,1,1,1]
            ],
        ]
    },
    {
        name: 'O',
        rotations: [
            [
                [1,1],
                [1,1]
            ]
        ]
    },
    {
        name: 'J',
        rotations: [
            [
                [0,1],
                [0,1],
                [1,1],
            ],
            [
                [1,0,0],
                [1,1,1],
            ],
            [
                [1,1],
                [1,0],
                [1,0],
            ],
            [
                [1,1,1],
                [0,0,1],
            ],
        ]
    }
]

class Shape extends GameObject {
    color = 'red'
    shapes = []
    blockSize: number
    width: number
    height: number
    layout: Array<Array<Array<number>>>
    constructor(context: CanvasRenderingContext2D | null, x: number, y: number, blockSize: number){
        super(context, x, y)
        this.blockSize = blockSize
        this.width = blockSize
        this.height = blockSize * 4
        this.layout = shapes[2].rotations
    }
    draw(){
        if(!this.context) return
        // this.context.fillRect(this.x, this.y, this.width, this.height)

        this.context.fillStyle = this.color
        this.context.beginPath()
        this.context.moveTo(this.x, this.y)
        this.context.lineTo(this.x + this.blockSize, this.y)
        this.context.lineTo(this.x + this.blockSize, this.y + this.blockSize * 4)
        this.context.lineTo(this.x, this.y + this.blockSize * 4)
        this.context.fill()
    }
    update({ x = this.x, y = this.y }: Position){
        this.x = x
        this.y = y
    }
}

export default Shape