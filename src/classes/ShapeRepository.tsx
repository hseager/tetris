import shapes from '../data/shapes'

class ShapeRepository {
    static getShape(type: number){
        return shapes[type]
    }
    static getRandomShape(){
        return this.getShape(Math.floor(Math.random() * Math.floor(shapes.length)))
    }
}

export default ShapeRepository