'use client'
import './Chessboard.css'
import React, { useEffect, useState } from 'react'
import Tile from './Tile'

let whiteMove = true

interface Piece {
    name: string
    isWhite: boolean 
    image: string
    selected: boolean
    highlighted: boolean
    hasMoved: boolean
    empty: boolean
}

export default function Chessboard(){

    // const [pieces, setPieces] = useState<Piece[]>(initializePieces());
    const [board, setBoard] = useState([])
    const [pieces, setPieces] = useState<(Piece)[][]>(initializePieces())
    const [pieceSelected, selectPiece] = useState<number[] | null>(null)
    const [possibleMoves, setPossibleMoves] = useState<number[][] | null>()

    const handleOnClick = (x: number, y: number) => {

        // Selecting a new piece to move
        if(pieces[x][y].empty == false && whiteMove == pieces[x][y].isWhite) {
            if(pieceSelected != null) {
                setPieces(prevPieces => {
                    const newPieces = prevPieces.map((row, rowIndex) =>
                        row.map((piece, colIndex) => {
                            if (rowIndex === pieceSelected[0] && colIndex === pieceSelected[1] && piece) {
                                return deselectPiece(pieces[pieceSelected[0]][pieceSelected[1]])
                            }
                            return piece
                        })
                    )
                    return newPieces
                })
            }
            selectPiece([x,y])

            unhighlightMoves()
            let moves : number[][] | null = null
            moves = calculatePossibleMoves(pieces, pieces[x][y], x, y)
            setPossibleMoves(moves)

            setPieces(prevPieces => {
                const newPieces = prevPieces.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                        if (rowIndex === x && colIndex === y && piece.empty == false) {
                            return selectNewPiece(piece)
                        }

                        if (moves && moves.some(move => move[0] === rowIndex && move[1] === colIndex)) {
                            return highlightPiece(pieces[rowIndex][colIndex])
                        }
                        return piece
                    })
                )
                return newPieces
            })
        } 
        // Moving a piece to an empty square    TODO: Check if it's a valid move
        else if (pieces[x][y].empty && pieceSelected) {
            if (possibleMoves && possibleMoves.some(move => move[0] === x && move[1] === y)) {
                unhighlightMoves()
                movePiece(pieceSelected, [x,y])
                whiteMove = !whiteMove
                selectPiece(null)
                setPossibleMoves(null)
            }
        } 
        // Capturing a piece                    TODO: Check if it's a valid move
        else if (pieces[x][y].empty == false && whiteMove != pieces[x][y].isWhite && pieceSelected) {
            if (possibleMoves && possibleMoves.some(move => move[0] === x && move[1] === y)) {
                unhighlightMoves()
                movePiece(pieceSelected, [x,y])
                whiteMove = !whiteMove
                selectPiece(null)
                setPossibleMoves(null)
            }
        }
    }

    const movePiece = (from: number[], to: number[]) => {
        setPieces(prevPieces => {
            const newPieces = prevPieces.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                    if (rowIndex === from[0] && colIndex === from[1] && piece) {
                        return emptyPiece()
                    }
                    if (rowIndex === to[0] && colIndex === to[1]) {
                        return deselectAndMove(pieces[from[0]][from[1]])
                    }
                    return piece
                })
            )
            return newPieces
        })
    }

    const unhighlightMoves = () => {
        setPieces(prevPieces => {
            const newPieces = prevPieces.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                    if (possibleMoves && possibleMoves.some(move => move[0] === rowIndex && move[1] === colIndex)) {
                        return unhighlightPiece(pieces[rowIndex][colIndex])
                    }
                    return piece
                })
            )
            return newPieces
        })
    }

    useEffect(() => {
        let newBoard: any = []
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j <= 7; j++) {
                newBoard.push(<Tile key={i+','+j} piece={pieces[i][j]}  x={i} y={j} 
                    onClick={() => handleOnClick(i,j)}
                />)}
        }   
        setBoard(newBoard); 
    }, [pieces])

    return (
        <div id='chessboard' className=''>
            {board}
        </div>
    );
}

const initializePieces = (): (Piece)[][] => {
    return [[
        newPiece("rook", true, "/games/Chess/whiterook.png"),
        newPiece("knight", true, "/games/Chess/whitenight.png"),
        newPiece("bishop", true, "/games/Chess/whitebishop.png"),
        newPiece("queen", true, "/games/Chess/whitequeen.png"),
        newPiece("king", true, "/games/Chess/whiteking.png"),
        newPiece("bishop", true, "/games/Chess/whitebishop.png"),
        newPiece("knight", true, "/games/Chess/whitenight.png"),
        newPiece("rook", true, "/games/Chess/whiterook.png")
    ],
    [
        newPiece("pawn", true, "/games/Chess/whitepawn.png"),
        newPiece("pawn", true, "/games/Chess/whitepawn.png"),
        newPiece("pawn", true, "/games/Chess/whitepawn.png"),
        newPiece("pawn", true, "/games/Chess/whitepawn.png"),
        newPiece("pawn", true, "/games/Chess/whitepawn.png"),
        newPiece("pawn", true, "/games/Chess/whitepawn.png"),
        newPiece("pawn", true, "/games/Chess/whitepawn.png"),
        newPiece("pawn", true, "/games/Chess/whitepawn.png")
    ],
    [emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece()],
    [emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece()],
    [emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece()],
    [emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece(), emptyPiece()],
    [
        newPiece("pawn", false, "/games/Chess/blackpawn.png"),
        newPiece("pawn", false, "/games/Chess/blackpawn.png"),
        newPiece("pawn", false, "/games/Chess/blackpawn.png"),
        newPiece("pawn", false, "/games/Chess/blackpawn.png"),
        newPiece("pawn", false, "/games/Chess/blackpawn.png"),
        newPiece("pawn", false, "/games/Chess/blackpawn.png"),
        newPiece("pawn", false, "/games/Chess/blackpawn.png"),
        newPiece("pawn", false, "/games/Chess/blackpawn.png")
    ],
    [
        newPiece("rook", false, "/games/Chess/blackrook.png"),
        newPiece("knight", false, "/games/Chess/blacknight.png"),
        newPiece("bishop", false, "/games/Chess/blackbishop.png"),
        newPiece("queen", false, "/games/Chess/blackqueen.png"),
        newPiece("king", false, "/games/Chess/blackking.png"),
        newPiece("bishop", false, "/games/Chess/blackbishop.png"),
        newPiece("knight", false, "/games/Chess/blacknight.png"),
        newPiece("rook", false, "/games/Chess/blackrook.png")
    ]
    ];
};


const emptyPiece = () : Piece => {
    return ({name: "", isWhite: true, image: "", selected: false, hasMoved: false, highlighted: false, empty: true})
}
const newPiece = (name: string, isWhite: boolean, image: string) : Piece => {
    return ({name: name, isWhite: isWhite, image: image, selected: false, hasMoved: false, highlighted: false, empty: false});
}
const selectNewPiece = (piece: Piece) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: true, hasMoved: piece.hasMoved, highlighted: false, empty: false});
}
const deselectPiece = (piece: (Piece)) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: false, hasMoved: piece.hasMoved, highlighted: false, empty: false});
}
const deselectAndMove  = (piece: (Piece)) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: false, hasMoved: true, highlighted: false, empty: false});
}
const highlightPiece = (piece: Piece) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: piece.empty});
}
const unhighlightPiece = (piece: Piece) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: false, empty: piece.empty});
}

const calculatePossibleMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    switch (piece.name) {
        case "pawn":
            return pawnMoves(pieces, piece, x, y);
        case "rook":
            return rookMoves(pieces, piece, x, y);
        case "bishop":
            return bishopMoves(pieces, piece, x, y);
        case "knight":
            return knightMoves(pieces, piece, x, y);
        case "queen":
            return queenMoves(pieces, piece, x, y);
        case "king":
            return kingMoves(pieces, piece, x, y);
        default:
            console.error("Unknown piece type:", piece?.name);
            return [];
    }
}

const pawnMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
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

const rookMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
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

const bishopMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
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

const knightMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
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

const queenMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const rookMovesList = rookMoves(pieces, piece, x, y)
    const bishopMovesList = bishopMoves(pieces, piece, x, y)
    return [...rookMovesList, ...bishopMovesList]
}

const kingMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
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


    return moves
}

