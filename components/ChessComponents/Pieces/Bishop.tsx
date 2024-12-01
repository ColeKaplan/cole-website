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


export const bishopValue = (pieces: Piece[][], piece: Piece, x: number, y: number) => {
    let value = 300;

    let pieceCount = 0;
    for(let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (pieces[i][j].empty == false) {
                pieceCount += 1;
            }
        }
    }
    value += ((32 - pieceCount) * 6);

    return value
}