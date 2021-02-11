class Shape extends Path2D {
    colors = ['red','blue', 'orange']
    color: string
    constructor(){
        super()
        this.color = this.colors[1]
        this.rect(80, 0, 40, 40)
    }
}

export default Shape