import { Piece } from "../Chessboard";
import { rookCaptures, rookMoves } from "./Rook";
import { bishopCaptures, bishopMoves } from "./Bishop";

export const queenMoves = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const rookMovesList = rookMoves(pieces, piece, x, y)
    const bishopMovesList = bishopMoves(pieces, piece, x, y)
    return [...rookMovesList, ...bishopMovesList]
}

export const queenCaptures = (pieces: (Piece)[][], piece: Piece, x: number, y: number): number[][] => {
    const rookCapturesList = rookCaptures(pieces, piece, x, y)
    const bishopCapturesList = bishopCaptures(pieces, piece, x, y)
    return [...rookCapturesList, ...bishopCapturesList]
}