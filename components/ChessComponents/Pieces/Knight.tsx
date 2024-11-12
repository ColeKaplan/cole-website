import { Piece } from "../Chessboard";

export const knightMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = []
    for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
            if (i != 0 && j != 0 && Math.abs(i) != Math.abs(j)) {
                if(x + i <= 7 && x + i >= 0 && y + j <= 7 && y + j >= 0) {
                    if (pieces[x+i][y+j].empty) {
                        moves.push([x+i,y+j])
                    } else {
                        if (pieces[x+i][y+j].isWhite != piece.isWhite) {
                            moves.push([x+i,y+j])
                        }
                    }
                }
            }
        }
    }
    return moves
}

export const knightCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = []
    for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
            if (i != 0 && j != 0 && Math.abs(i) != Math.abs(j)) {
                if(x + i <= 7 && x + i >= 0 && y + j <= 7 && y + j >= 0) {
                    moves.push([x+i,y+j])
                }
            }
        }
    }
    return moves
}