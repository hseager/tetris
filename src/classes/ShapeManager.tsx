import shapes from '../data/shapes'

class ShapeManager {
    static getRandomShapeType(){
        return Math.floor(Math.random() * Math.floor(shapes.length))
    }
    static getShapeColor(type: number){
        return shapes[type].color
    }
    static getShape(type: number){
        return shapes[type]
    }
}

export default ShapeManager