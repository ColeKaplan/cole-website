import { Piece, isAttacked } from "../Chessboard";

export const kingMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    // TODO: Moving into check and castling
    const moves: number[][] = []
    
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
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

    // Castling
    if (piece.hasMoved == false && isAttacked(pieces, x, y, piece.isWhite) == false) {
         // Check right
         if (pieces[x][y+1].empty && isAttacked(pieces, x, y+1, piece.isWhite) == false && pieces[x][y+2].empty && isAttacked(pieces, x, y+2, piece.isWhite) == false) {
            if (pieces[x][y+3].name == "rook" && pieces[x][y+3].hasMoved == false) {
                moves.push([x,y+2])
            }
         }

         // Check left
         if (pieces[x][y-1].empty && isAttacked(pieces, x, y-1, piece.isWhite) == false && pieces[x][y-2].empty && isAttacked(pieces, x, y-2, piece.isWhite) == false && pieces[x][y-3].empty) {
            if (pieces[x][y-4].name == "rook" && pieces[x][y-4].hasMoved == false) {
                moves.push([x,y-2])
            }
         }
    } 

    return moves
}

export const kingCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    // TODO: Moving into check and castling
    const moves: number[][] = []
    
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if(x + i <= 7 && x + i >= 0 && y + j <= 7 && y + j >= 0) {
                moves.push([x+i,y+j])
            }
        }
    }
    return moves
}