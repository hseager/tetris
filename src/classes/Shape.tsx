import GameObject from './GameObject'
import Position from './Position'

class Shape extends GameObject {
    width = 40
    height = 40
    color = 'red'
    constructor(context: CanvasRenderingContext2D | null, x: number, y: number){
        super(context, x, y)
    }
    draw(){
        if(!this.context) return
        this.context.fillStyle = this.color
        this.context.fillRect(this.x, this.y, this.width, this.height)
    }
    update({ x = this.x, y = this.y }: Position){
        this.x = x
        this.y = y
    }
}

export default Shape