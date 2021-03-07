const scores = [100, 300, 500, 800]

class ScoreManager {
    static calculateScore(rows: number): number {
        return scores[rows - 1]
    }
}

export default ScoreManager