import GameObject from './GameObject'

class Shape extends GameObject {
    width = 40
    height = 40

    constructor(context: CanvasRenderingContext2D, x: number, y: number){
        super(context, x, y)
    }

    draw(){
        this.context.fillStyle = 'red'
        this.context.fillRect(this.x, this.y, this.width, this.height)
    }

    update(secondsPassed: number){
        this.y += secondsPassed
    }
}

export default Shape