import shapes from '../data/shapes'
import Block from './Block'

class ShapeBuilder {
    static buildShape(name: string, rotation: number){
        let newShape: Array<Block> = []
        const shape = shapes.find(s => s.name === name)
        const shapeRotation = shape?.rotations[rotation]
        shapeRotation?.map((row, y) => {
            row.map((column, x) => {
                if(column){
                    newShape.push(new Block(null, x, y))
                }
            })
        })
        return newShape
    }
}

export default ShapeBuilder