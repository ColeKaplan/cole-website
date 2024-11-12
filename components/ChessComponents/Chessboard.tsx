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
import * as Switch from "@radix-ui/react-switch";



let whiteMove = true

export interface Piece {
    name: string
    isWhite: boolean 
    image: string
    selected: boolean
    highlighted: boolean
    hasMoved: boolean
    empty: boolean
    promotionImage: string// TODO: implement promotion with this
}

let count = 0

export default function Chessboard(){

    const [board, setBoard] = useState([])
    const [pieces, setPieces] = useState<(Piece)[][]>(initializePieces())
    const [pieceSelected, selectPiece] = useState<number[] | null>(null)
    const [possibleMoves, setPossibleMoves] = useState<number[][] | null>()
    const [inPromotion, setPromotion] = useState<number[] | null>(null)
    const [enPoissantSquare, setEnPoissantSquare] = useState<number[] | null>(null) // The square that can be captured by en poissant
    const [checkmate, setCheckmate] = useState<boolean>(false)
    const [stalemate, setStalemate] = useState<boolean>(false)
    const [isAI, setIsAI] = useState<boolean>(false) // For using the AI
    const [whiteMove, setWhiteMove] = useState<boolean>(true)

    const handleOnClick = (x: number, y: number) => {

        if(inPromotion != null) {
            handlePromotion(x,y)
            return
        }

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
            moves = calculatePossibleMoves(pieces, pieces[x][y], x, y, enPoissantSquare)
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
                setWhiteMove(!whiteMove)
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
                setWhiteMove(!whiteMove)
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

        // Check for en poissant take
        if(enPoissantSquare != null && to[0] == enPoissantSquare[0] && to[1] == enPoissantSquare[1]) {
            setPieces(prevPieces => {
                const newPieces = prevPieces.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                        if (rowIndex === from[0] && colIndex === to[1]) {
                            return emptyPiece()
                        }
                        return piece
                    })
                )
                return newPieces
            })
        }

        // Normal movement
        setPieces(prevPieces => {
            const newPieces = prevPieces.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                    if (rowIndex === from[0] && colIndex === from[1]) {
                        return emptyPiece()
                    }
                    if (rowIndex === to[0] && colIndex === to[1]) {
                        return deselectAndMove(pieces[from[0]][from[1]])
                    }
                    return piece
                })
            )

            // Check for checkmate then finish the move
            checkCheckmate(newPieces, enPoissantSquare, setCheckmate, setStalemate, !whiteMove)
            return newPieces
        })
        // Set promotion variable when pawn needs to be promoted
        if((to[0] == 7 || to[0] == 0) && pieces[from[0]][from[1]].name == "pawn") {
            setPromotion(to)
        }

        // Set en poissant square when en poissant is possible
        if(pieces[from[0]][from[1]].name == "pawn" && pieces[from[0]][from[1]].hasMoved == false && Math.abs(to[0] - from[0]) == 2) {
            setEnPoissantSquare([from[0] + ((to[0] - from[0]) / 2), from[1]])
        } else if(enPoissantSquare != null) {
            setEnPoissantSquare(null)
        }

    // End movePiece
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

    const handlePromotion = (x: number, y: number) => {
        if (pieces[x][y].promotionImage == "" || inPromotion == null) {
            return;
        }
        let replacementPiece : Piece | null = null
        if(x == 4 && y == 0) {
            if(pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                replacementPiece = newPiece("queen", true, "/games/Chess/whitequeen.png")
            } else {
                replacementPiece = newPiece("queen", false, "/games/Chess/blackqueen.png")
            }
        } else if(x == 3 && y == 0) {
            if(pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                replacementPiece = newPiece("knight", true, "/games/Chess/whitenight.png")
            } else {
                replacementPiece = newPiece("knight", false, "/games/Chess/blacknight.png")
            }
        } else if(x == 4 && y == 7) {
            if(pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                replacementPiece = newPiece("rook", true, "/games/Chess/whiterook.png")
            } else {
                replacementPiece = newPiece("rook", false, "/games/Chess/blackrook.png")
            }
        } else if(x == 3 && y == 7) {
            if(pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                replacementPiece = newPiece("bishop", true, "/games/Chess/whitebishop.png")
            } else {
                replacementPiece = newPiece("bishop", false, "/games/Chess/blackbishop.png")
            }
        }
        if (replacementPiece != null) {
            setPieces(prevPieces => {
                const newPieces = prevPieces.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                        if (rowIndex === inPromotion[0] && colIndex === inPromotion[1] && piece) {
                            return replacementPiece
                        }
                        return piece
                    })
                )
                return newPieces
            })
            setPromotion(null)
        }
    }

    // UseEffect for updating the promotion selection pieces
    useEffect (() => {
        if(inPromotion != null) {
            setPieces(prevPieces => {
                const newPieces = prevPieces.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                        if (rowIndex === 4 && colIndex === 0 && piece) {
                            if (pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/whitequeen.png"});
                            } else {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/blackqueen.png"});
                            }
                        } else if (rowIndex === 3 && colIndex === 0 && piece) {
                            if (pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/whitenight.png"});
                            } else {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/blacknight.png"});
                            }
                        } else if (rowIndex === 4 && colIndex === 7 && piece) {
                            if (pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/whiterook.png"});
                            } else {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/blackrook.png"});
                            }
                        } else if (rowIndex === 3 && colIndex === 7 && piece) {
                            if (pieces[inPromotion[0]][inPromotion[1]].isWhite) {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/whitebishop.png"});
                            } else {
                                return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: false, promotionImage: "/games/Chess/blackbishop.png"});
                            }
                        }
                        return piece
                    })
                )
                return newPieces
            })
        } else {
            setPieces(prevPieces => {
                const newPieces = prevPieces.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                        if (rowIndex === 4 && colIndex === 0 || rowIndex === 3 && colIndex === 0 || rowIndex === 4 && colIndex === 7 || rowIndex === 3 && colIndex === 7) {
                            const isEmpty = (piece.image == "")
                            return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: false, empty: isEmpty, promotionImage: ""});
                        }
                        return piece
                    })
                )
                return newPieces
            })
        }
    }, [inPromotion])

    // UseEffect for any time pieces change to update the tiles
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

    // UseEffect for AI Move
     useEffect(() => {
        count += 1
        if (!whiteMove && isAI && !checkmate && !stalemate) {
            // AI's turn to move
            let moves : number[][][] = []
            let tempMoves : number[][] | null = null
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const piece : Piece = pieces[i][j]
                    if (piece.empty == false && piece.isWhite == whiteMove) {
                        tempMoves = calculatePossibleMoves(pieces, piece, i, j, enPoissantSquare)
                        removeChecks(tempMoves, pieces, piece, i, j)
                        if (tempMoves && tempMoves.length > 0) {
                            moves.push([[i, j], ...tempMoves])
                        }
                        
                    }
                }
            }
            // Moves now has every move AI could make
            
            if(moves.length == 0) {
                console.log("no moves? for ai")
            } else {

                // Move first option you have
                const xFrom : number = moves[0][0][0]
                const yFrom : number = moves[0][0][1]
                const pieceToMove : Piece = pieces[xFrom][yFrom]
                const xTo : number = moves[0][1][0]
                const yTo : number = moves[0][1][1]
    
                movePiece([xFrom, yFrom], [xTo,yTo])
                setWhiteMove(!whiteMove)
            }


        }
    }, [whiteMove])

    const restart = () => {
        setPieces(initializePieces)
        selectPiece(null)
        setPromotion(null)
        setEnPoissantSquare(null)
        setCheckmate(false)
        setStalemate(false)
    }

    return (
        <div>
            {/* The toggle for AI */}
            <div className='flex justify-center pb-4'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only" checked={isAI} onChange={() => setIsAI(!isAI)} />
                    <div className={`w-10 h-6 ${isAI ? 'bg-[#2c6af9]' : 'bg-gray-400'}  rounded-full shadow-inner`}></div>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isAI ? 'transform translate-x-full' : ''}`}></div>
                </label>
                <span className="ml-2 text-black">{isAI ? "AI" : "2P"}</span>
            </div>
            <div className='flex flex-col justify-center items-center text-white'>
                {checkmate && <div className='pb-1'>Checkmate</div>}
                {stalemate && <div className='pb-1'>Stalemate</div>}
                {(checkmate || stalemate) && <div className='pb-2'>
                    <button className="bg-[#022944] text-center px-1 rounded-md hover:bg-[#002742]" onClick={() => restart()}>Restart</button>
                    </div>}
            </div>
            <div id='chessboard' className=''>
                {board}
            </div>
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
    return ({name: "", isWhite: true, image: "", selected: false, hasMoved: false, highlighted: false, empty: true, promotionImage: ""})
}
const newPiece = (name: string, isWhite: boolean, image: string) : Piece => {
    return ({name: name, isWhite: isWhite, image: image, selected: false, hasMoved: false, highlighted: false, empty: false, promotionImage: ""});
}
const selectNewPiece = (piece: Piece) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: true, hasMoved: piece.hasMoved, highlighted: false, empty: false, promotionImage: ""});
}
const deselectPiece = (piece: (Piece)) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: false, hasMoved: piece.hasMoved, highlighted: false, empty: false, promotionImage: ""});
}
const deselectAndMove  = (piece: (Piece)) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: false, hasMoved: true, highlighted: false, empty: false, promotionImage: ""});
}
const highlightPiece = (piece: Piece) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: true, empty: piece.empty, promotionImage: ""});
}
const unhighlightPiece = (piece: Piece) : Piece => {
    return ({name: piece.name, isWhite: piece.isWhite, image: piece.image, selected: piece.selected, hasMoved: piece.hasMoved, highlighted: false, empty: piece.empty, promotionImage: ""});
}

export const isAttacked = (pieces: Piece[][], x: number, y: number, isWhite: boolean, enPoissantSquare: number[] | null): boolean => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece : Piece = pieces[i][j]
            if (piece.empty == false && piece.isWhite !== isWhite) {
                const moves = calculatePossibleCaptures(pieces, piece, i, j, enPoissantSquare);
                if (moves.some(move => move[0] === x && move[1] === y)) {
                    return true;
                }
            }
        }
    }
    return false;
}


// Strategy is to move the piece, then search the board for it's king and see if the king is under attack. If so, don't allow that move
// This accounts for both revealing the king into check, and being forced to help when the king is in check
const removeChecks = (moves: number[][], pieces: Piece[][], piece: Piece, x: number, y: number) => {
    if(piece.name == "king") {
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
            if(isAttacked(newPieces, moves[i][0], moves[i][1], piece.isWhite, null)) {
                moves.splice(i,1);
                i--
            }
        }
    } else {

        // first find the king at position k,j
        let looking = true;
        let kingPosition : number[] = [8,8]
        for(let k = 0; k <= 7; k++) {
            if(looking){
                for(let j = 0; j <= 7; j++) {
                    if(looking && pieces[k][j].name == "king" && pieces[k][j].isWhite == piece.isWhite) {
                        kingPosition = [k,j]
                        looking = false;
                    }
                }
            }
        }

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
            
            if (isAttacked(newPieces, kingPosition[0], kingPosition[1], piece.isWhite, null)) {
                moves.splice(i,1);
                i--;
                
            }
        }
    }
}

const calculatePossibleMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number, enPoissantSquare: number[] | null): number[][] => {
    switch (piece.name) {
        case "pawn":
            return pawnMoves(pieces, piece, x, y, enPoissantSquare);
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


const calculatePossibleCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number, enPoissantSquare: number[] | null): number[][] => {
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

const checkCheckmate = (pieces: Piece[][], enPoissantSquare: number[] | null, setCheckmate: Function, setStalemate: Function, whiteMove: boolean) : boolean => {
    let moves : number[][] | null = null
    console.log("checking if " + (whiteMove ? "white" : "black") + "  is in checkmate")
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece : Piece = pieces[i][j]
            if (piece.isWhite == whiteMove) {
                moves = calculatePossibleMoves(pieces, piece, i, j, enPoissantSquare)
                removeChecks(moves, pieces, piece, i, j)
                if (moves != null && moves.length != 0) {
                    console.log("not in checkmate because of move: " + moves)
                    return false
                }
            }
        }
    }
    let looking = true
    let inCheck = false
    
    for(let k = 0; k <= 7; k++) {
        if(looking){
            for(let j = 0; j <= 7; j++) {
                if(looking && pieces[k][j].name == "king" && pieces[k][j].isWhite == whiteMove) {
                    if (isAttacked(pieces, k, j, whiteMove, null)) {
                        inCheck = true
                        looking = false
                    }
                }
            }
        }
    }

    if(inCheck) {
        setCheckmate(true)
        return true
    } else {
        setStalemate(true)
        return false
    }

}