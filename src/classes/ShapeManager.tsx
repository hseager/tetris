import shapes from '../data/shapes'
import Block from './Block'

class ShapeManager {
    static buildShape(type: number, rotation: number){
        let newShape: Array<Block> = []
        const shape = shapes.find(s => s.id === type)
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
}

export default ShapeManager