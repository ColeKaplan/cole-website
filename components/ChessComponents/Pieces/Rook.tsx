import { Piece } from "../Chessboard";

export const rookMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = []
    let flag : boolean = true

    // Check for up direction
    let distance = 1
    while(flag && distance <= (7-x)) {
        if (pieces[x+distance][y].empty) {
            moves.push([x+distance,y])
        } else {
            if (pieces[x+distance][y].isWhite != piece.isWhite) {
                flag = false
                moves.push([x+distance,y])
            } else {
                flag = false
            }
        }
        distance++
    }

    // Check for down direction
    flag = true
    distance = 1
    while(flag && distance <= (x)) {
        if (pieces[x-distance][y].empty) {
            moves.push([x-distance,y])
        } else {
            if (pieces[x-distance][y].isWhite != piece.isWhite) {
                flag = false
                moves.push([x-distance,y])
            } else {
                flag = false
            }
        }
        distance++
    }

    // Check for right direction
    flag = true
    distance = 1
    while(flag && distance <= (7-y)) {
        if (pieces[x][y+distance].empty) {
            moves.push([x,y+distance])
        } else {
            if (pieces[x][y+distance].isWhite != piece.isWhite) {
                flag = false
                moves.push([x,y+distance])
            } else {
                flag = false
            }
        }
        distance++
    }

    // Check for left direction
    flag = true
    distance = 1
    while(flag && distance <= (y)) {
        if (pieces[x][y-distance].empty) {
            moves.push([x,y-distance])
        } else {
            if (pieces[x][y-distance].isWhite != piece.isWhite) {
                flag = false
                moves.push([x,y-distance])
            } else {
                flag = false
            }
        }
        distance++
    }
    return moves
}


export const rookCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = []
    let flag : boolean = true

    // Check for up direction
    let distance = 1
    while(flag && distance <= (7-x)) {
        if (pieces[x+distance][y].empty) {
            moves.push([x+distance,y])
        } else {
            flag = false
            moves.push([x+distance,y])
        }
        distance++
    }

    // Check for down direction
    flag = true
    distance = 1
    while(flag && distance <= (x)) {
        if (pieces[x-distance][y].empty) {
            moves.push([x-distance,y])
        } else {
            flag = false
            moves.push([x-distance,y])
        }
        distance++
    }

    // Check for right direction
    flag = true
    distance = 1
    while(flag && distance <= (7-y)) {
        if (pieces[x][y+distance].empty) {
            moves.push([x,y+distance])
        } else {
            flag = false
            moves.push([x,y+distance])
        }
        distance++
    }

    // Check for left direction
    flag = true
    distance = 1
    while(flag && distance <= (y)) {
        if (pieces[x][y-distance].empty) {
            moves.push([x,y-distance])
        } else {
            flag = false
            moves.push([x,y-distance])
        }
        distance++
    }
    return moves
}


export const rookValue = (pieces: Piece[][], piece: Piece, x: number, y: number) => {
    let value = 500;

    const captures = rookCaptures(pieces, piece, x, y).length
    value += (captures * 10)

    return value
}