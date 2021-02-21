import Shape from '../classes/Shape'

interface NextShapeProps {
    shape: Shape | undefined
}

function NextShape({shape} : NextShapeProps){
    return (
        <div className="border-solid border-8 border-gray-300 bg-white rounded-md p-4 w-20 h-20">
            { shape?.color }
        </div>
    )
}

export default NextShape