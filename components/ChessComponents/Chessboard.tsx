'use client'
import './Chessboard.css'
import React, { useEffect, useState } from 'react'
import Tile from './Tile'
import { pawnCaptures, pawnMoves } from './Pieces/Pawn'
import { knightMoves, knightCaptures } from './Pieces/Knight'
import { bishopMoves, bishopCaptures } from './Pieces/Bishop'
import { rookMoves, rookCaptures } from './Pieces/Rook'
import { queenMoves, queenCaptures } from './Pieces/Queen'
import { kingMoves, kingCaptures } from './Pieces/King'
import { PiCheckSquareOffset, PiDeviceMobileSpeaker } from 'react-icons/pi'


let whiteMove = true

export interface Piece {
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
            removeChecks(moves, pieces, pieces[x][y], x, y)
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
        // Moving a piece to an empty square
        else if (pieces[x][y].empty && pieceSelected) {
            if (possibleMoves && possibleMoves.some(move => move[0] === x && move[1] === y)) {
                unhighlightMoves()

                // Check if it is a castle
                if(pieces[pieceSelected[0]][pieceSelected[1]].name == "king" && Math.abs(pieceSelected[1] - y) == 2) {
                    if(pieceSelected[1] > y) {
                        movePiece([pieceSelected[0],0],[pieceSelected[0],3])
                    } else {
                        movePiece([pieceSelected[0],7],[pieceSelected[0],5])
                    }
                }

                movePiece(pieceSelected, [x,y])
                whiteMove = !whiteMove
                selectPiece(null)
                setPossibleMoves(null)
            }  
            // Click an uncapturable square
            else if (possibleMoves && possibleMoves.every(move => move[0] != x || move[1] != y)) {
                unhighlightMoves()
                setPieces(prevPieces => {
                    const newPieces = prevPieces.map((row, rowIndex) =>
                        row.map((piece, colIndex) => {
                            if (rowIndex === pieceSelected[0] && colIndex === pieceSelected[1]) {
                                return deselectPiece(pieces[pieceSelected[0]][pieceSelected[1]])
                            }
                            return piece
                        })
                    )
                    return newPieces
                })
                selectPiece(null)
                setPossibleMoves(null)
            }
        } 
        // Capturing a piece
        else if (pieces[x][y].empty == false && whiteMove != pieces[x][y].isWhite && pieceSelected) {
            if (possibleMoves && possibleMoves.some(move => move[0] === x && move[1] === y)) {
                unhighlightMoves()
                movePiece(pieceSelected, [x,y])
                whiteMove = !whiteMove
                selectPiece(null)
                setPossibleMoves(null)
            }

            // Clicks an uncapturable piece
            else if (possibleMoves && possibleMoves.every(move => move[0] != x || move[1] != y)) {
                unhighlightMoves()
                setPieces(prevPieces => {
                    const newPieces = prevPieces.map((row, rowIndex) =>
                        row.map((piece, colIndex) => {
                            if (rowIndex === pieceSelected[0] && colIndex === pieceSelected[1]) {
                                return deselectPiece(pieces[pieceSelected[0]][pieceSelected[1]])
                            }
                            return piece
                        })
                    )
                    return newPieces
                })
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

export const isAttacked = (pieces: Piece[][], x: number, y: number, isWhite: boolean): boolean => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece : Piece = pieces[i][j]
            if (piece && piece.isWhite !== isWhite) {
                const moves = calculatePossibleCaptures(pieces, piece, i, j);
                if (moves.some(move => move[0] === x && move[1] === y)) {
                    return true;
                }
            }
        }
    }
    return false;
}

const removeChecks = (moves: number[][], pieces: Piece[][], piece: Piece, x: number, y: number) => {
    if(piece.name == "king") {
        for (let i = 0; i < moves.length; i++) {
            if(isAttacked(pieces, moves[i][0], moves[i][1], piece.isWhite)) {
                moves.splice(i,1);
                i--
            }
        }
    } else {
        for (let i = 0; i < moves.length; i++) {
            const newPieces = pieces.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                    if (rowIndex === x && colIndex === y) {
                        return emptyPiece()
                    }
                    if (rowIndex === moves[i][0] && colIndex === moves[i][1]) {
                        return deselectAndMove(pieces[x][y])
                    }
                    return piece
                })
            )
            let looking = true;
            for(let k = 0; k <= 7; k++) {
                if(looking){
                    for(let j = 0; j <= 7; j++) {
                        if(looking && pieces[k][j].name == "king" && pieces[k][j].isWhite == piece.isWhite) {
                            if (isAttacked(newPieces, k, j, piece.isWhite)) {
                                moves.splice(i,1);
                                i--;
                                looking = false;
                            }
                        }
                    }
                }
            }
        }
    }
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
        case "":
            return [];
        default:
            console.error("Unknown piece type:", piece?.name);
            return [];
    }
}


const calculatePossibleCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    switch (piece.name) {
        case "pawn":
            return pawnCaptures(pieces, piece, x, y);
        case "rook":
            return rookCaptures(pieces, piece, x, y);
        case "bishop":
            return bishopCaptures(pieces, piece, x, y);
        case "knight":
            return knightCaptures(pieces, piece, x, y);
        case "queen":
            return queenCaptures(pieces, piece, x, y);
        case "king":
            return kingCaptures(pieces, piece, x, y);
        case "":
            return [];
        default:
            console.error("Unknown piece type:", piece?.name);
            return [];
    }
}