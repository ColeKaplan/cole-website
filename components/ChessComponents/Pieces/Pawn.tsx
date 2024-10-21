import { Piece } from "../Chessboard";

export const pawnMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = [];
    const direction = piece.isWhite ? 1 : -1
        
    // Check if it can go one spot forward
    if(pieces[x+direction][y].empty) {
        moves.push([x+direction,y])
    }

    // Check if it can double move
    if (piece.hasMoved == false && moves.length == 1) {
        if (pieces[x+(direction*2)][y].empty) {
            moves.push([x+(direction*2),y])
        }
    }

    // Check if it can capture up to the left
    if(y > 0 && pieces[x+direction][y-1].empty == false && pieces[x+direction][y-1].isWhite != piece.isWhite) {
        moves.push([x+direction,y-1])
    }

    // Check if it can capture up to the right
    if(y < 7 && pieces[x+direction][y+1].empty == false && pieces[x+direction][y+1].isWhite != piece.isWhite) {
        moves.push([x+direction,y+1])
    }

    return moves
}


export const pawnCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = [];
    const direction = piece.isWhite ? 1 : -1

    // Check if it can capture up to the left
    moves.push([x+direction,y-1])

    // Check if it can capture up to the right
    moves.push([x+direction,y+1])

    return moves
}