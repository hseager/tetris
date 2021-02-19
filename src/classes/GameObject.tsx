class GameObject {
    context: CanvasRenderingContext2D
    x: number
    y: number
    isColliding: boolean
    constructor(context: CanvasRenderingContext2D, x: number, y: number){
        this.context = context
        this.x = x
        this.y = y
        this.isColliding = false
    }
}

export default GameObject