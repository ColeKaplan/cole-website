import { Piece } from "../Chessboard";

export const bishopMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = []
    let flag : boolean = true

    // Check for up-right direction
    let distance = 1
    while(flag && distance <= (7-x) && distance <= (7-y)) {
        if (pieces[x+distance][y+distance].empty) {
            moves.push([x+distance,y+distance])
        } else {
            if (pieces[x+distance][y+distance].isWhite != piece.isWhite) {
                flag = false
                moves.push([x+distance,y+distance])
            } else {
                flag = false
            }
        }
        distance++
    }

    // Check for down-right direction
    flag = true
    distance = 1
    while(flag && distance <= (x) && distance <= (7-y)) {
        if (pieces[x-distance][y+distance].empty) {
            moves.push([x-distance,y+distance])
        } else {
            if (pieces[x-distance][y+distance].isWhite != piece.isWhite) {
                flag = false
                moves.push([x-distance,y+distance])
            } else {
                flag = false
            }
        }
        distance++
    }

    // Check for up-left direction
    flag = true
    distance = 1
    while(flag && distance <= (7-x) && distance <= (y)) {
        if (pieces[x+distance][y-distance].empty) {
            moves.push([x+distance,y-distance])
        } else {
            if (pieces[x+distance][y-distance].isWhite != piece.isWhite) {
                flag = false
                moves.push([x+distance,y-distance])
            } else {
                flag = false
            }
        }
        distance++
    }

    // Check for down-left direction
    flag = true
    distance = 1
    while(flag && distance <= x && distance <= (y)) {
        if (pieces[x-distance][y-distance].empty) {
            moves.push([x-distance,y-distance])
        } else {
            if (pieces[x-distance][y-distance].isWhite != piece.isWhite) {
                flag = false
                moves.push([x-distance,y-distance])
            } else {
                flag = false
            }
        }
        distance++
    }
    return moves
}


export const bishopCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const moves: number[][] = []
    let flag : boolean = true

    // Check for up-right direction
    let distance = 1
    while(flag && distance <= (7-x) && distance <= (7-y)) {
        if (pieces[x+distance][y+distance].empty) {
            moves.push([x+distance,y+distance])
        } else {
            flag = false
            moves.push([x+distance,y+distance])
        }
        distance++
    }

    // Check for down-right direction
    flag = true
    distance = 1
    while(flag && distance <= (x) && distance <= (7-y)) {
        if (pieces[x-distance][y+distance].empty) {
            moves.push([x-distance,y+distance])
        } else {
            flag = false
            moves.push([x-distance,y+distance])
        }
        distance++
    }

    // Check for up-left direction
    flag = true
    distance = 1
    while(flag && distance <= (7-x) && distance <= (y)) {
        if (pieces[x+distance][y-distance].empty) {
            moves.push([x+distance,y-distance])
        } else {
            flag = false
            moves.push([x+distance,y-distance])
        }
        distance++
    }

    // Check for down-left direction
    flag = true
    distance = 1
    while(flag && distance <= x && distance <= (y)) {
        if (pieces[x-distance][y-distance].empty) {
            moves.push([x-distance,y-distance])
        } else {
            flag = false
            moves.push([x-distance,y-distance])
        }
        distance++
    }
    return moves
}