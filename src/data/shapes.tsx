import ShapeData from "../classes/ShapeData"

const shapes: Array<ShapeData> = [
    {
        name: 'I',
        color: '#ffadad',
        rotations: [
            [
                [0,1],
                [0,1],
                [0,1],
                [0,1]
            ],
            [
                [0,0,0,0],
                [1,1,1,1]
            ]
        ]
    },
    {
        name: 'O',
        color: '#ffd6a5',
        rotations: [
            [
                [0,0],
                [1,1],
                [1,1]
            ]
        ]
    },
    {
        name: 'J',
        color: '#fdffb6',
        rotations: [
            [
                [0,0],
                [0,1],
                [0,1],
                [1,1]
            ],
            [
                [1,0,0],
                [1,1,1]
            ],
            [
                [1,1],
                [1,0],
                [1,0]
            ],
            [
                [1,1,1],
                [0,0,1]
            ]
        ]
    },
    {
        name: 'L',
        color: '#caffbf',
        rotations: [
            [
                [0,0],
                [1,0],
                [1,0],
                [1,1]
            ],
            [
                [1,1,1],
                [1,0,0]
            ],
            [
                [1,1],
                [0,1],
                [0,1]
            ],
            [
                [0,0,1],
                [1,1,1]
            ]
        ]
    },
    {
        name: 'Z',
        color: '#9bf6ff',
        rotations: [
            [
                [0,0,0],
                [1,1,0],
                [0,1,1]
            ],
            [
                [0,1],
                [1,1],
                [1,0]
            ]
        ]
    },
    {
        name: 'S',
        color: '#a0c4ff',
        rotations: [
            [
                [0,0,0],
                [0,1,1],
                [1,1,0]
            ],
            [
                [1,0],
                [1,1],
                [0,1]
            ]
        ]
    },
    {
        name: 'T',
        color: '#bdb2ff',
        rotations: [
            [
                [0,0,0],
                [0,1,0],
                [1,1,1]
            ],
            [
                [1,0],
                [1,1],
                [1,0]
            ],
            [
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1],
                [1,1],
                [0,1]
            ]
        ]
    }
]

export default shapes