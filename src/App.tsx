import Board from './Board'

function App() {
    return (
        <div className="container">
            <h1 className="pt-4">Tetris</h1>
            <p className="py-2">Score: 0</p>
            <Board />
        </div>
    );
}

export default App;