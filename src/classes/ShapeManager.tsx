import shapes from '../data/shapes'
import Block from './Block'

class ShapeManager {
    static buildShape(type: number, rotation: number){
        let newShape: Array<Block> = []
        const shape = shapes[type]
        const shapeRotation = shape?.rotations[rotation]
        shapeRotation?.map((row, y) => {
            row.map((column, x) => {
                if(column)
                    newShape.push(new Block(null, x, y))
            })
        })
        return newShape
    }
    static getRandomShapeType(){
        return Math.floor(Math.random() * Math.floor(shapes.length))
    }
    static getShapeColor(type: number){
        return shapes[type].color
    }
}

export default ShapeManager