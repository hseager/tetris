enum MoveDirection {
    Up,
    Down,
    Left,
    Right
}

class Controls {
    static leftKeys = ['a', 'ArrowLeft']
    static rightKeys = ['d', 'ArrowRight']
    static upKeys = ['w', 'ArrowUp']
    static downKeys = ['s', 'ArrowDown']

    static readonly MoveDirection = MoveDirection
}

export default Controls