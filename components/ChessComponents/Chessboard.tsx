'use client'
import './Chessboard.css';
import React, { useEffect, useState } from 'react';
import Tile from './Tile';

const width = 500
const height = 500

interface Piece {
    name: string
    color: string 
    image: string
}

export default function Chessboard(){

    // const [pieces, setPieces] = useState<Piece[]>(initializePieces());
    const [board, setBoard] = useState([])
    const [pieces, setPieces] = useState<(Piece | null)[][]>(initializePieces())

    useEffect(() => {
        let newBoard: any = []
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j <= 7; j++) {
                newBoard.push(<Tile image={pieces[i][j] != null ? pieces[i][j].image : null} x={i} y={j}/>)
            }
        }   
        setBoard(newBoard); 
    }, [pieces])


    return (<div className='flex items-center justify-center'>
        <div id='chessboard' className=''>
            {board}
        </div>
    </div>);
}

const initializePieces = (): (Piece | null)[][] => {
    return [[
        { name: "rook", color: "white", image: "/games/Chess/whiterook.png"},
        { name: "knight", color: "white", image: "/games/Chess/whitenight.png"},
        { name: "bishop", color: "white", image: "/games/Chess/whitebishop.png"},
        { name: "queen", color: "white", image: "/games/Chess/whitequeen.png"},
        { name: "king", color: "white", image: "/games/Chess/whiteking.png"},
        { name: "bishop", color: "white", image: "/games/Chess/whitebishop.png"},
        { name: "knight", color: "white", image: "/games/Chess/whitenight.png"},
        { name: "rook", color: "white", image: "/games/Chess/whiterook.png"}],
        
        [
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/whitepawn.png"}],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],

        [
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"},
        { name: "pawn", color: "white", image: "/games/Chess/blackpawn.png"}],
            
        [
        { name: "rook", color: "white", image: "/games/Chess/blackrook.png"},
        { name: "knight", color: "white", image: "/games/Chess/blacknight.png"},
        { name: "bishop", color: "white", image: "/games/Chess/blackbishop.png"},
        { name: "queen", color: "white", image: "/games/Chess/blackqueen.png"},
        { name: "king", color: "white", image: "/games/Chess/blackking.png"},
        { name: "bishop", color: "white", image: "/games/Chess/blackbishop.png"},
        { name: "knight", color: "white", image: "/games/Chess/blacknight.png"},
        { name: "rook", color: "white", image: "/games/Chess/blackrook.png"}]
    ];
};




//         { name: "rook", color: "white", x: 1, y: 1, image: "/games/Chess/whiterook.png"},
//         { name: "knight", color: "white", x: 2, y: 1, image: "/games/Chess/whiteknight.png"},
//         { name: "bishop", color: "white", x: 3, y: 1, image: "/games/Chess/whitebishop.png"},
//         { name: "queen", color: "white", x: 4, y: 1, image: "/games/Chess/whitequeen.png"},
//         { name: "king", color: "white", x: 5, y: 1, image: "/games/Chess/whiteking.png"},
//         { name: "bishop", color: "white", x: 6, y: 1, image: "/games/Chess/whitebishop.png"},
//         { name: "knight", color: "white", x: 7, y: 1, image: "/games/Chess/whiteknight.png"},
//         { name: "rook", color: "white", x: 8, y: 1, image: "/games/Chess/whiterook.png"}],
        
//         [
//         { name: "pawn", color: "white", x: 1, y: 2, image: "/games/Chess/whitepawn.png"},
//         { name: "pawn", color: "white", x: 2, y: 2, image: "/games/Chess/whitepawn.png"},
//         { name: "pawn", color: "white", x: 3, y: 2, image: "/games/Chess/whitepawn.png"},
//         { name: "pawn", color: "white", x: 4, y: 2, image: "/games/Chess/whitepawn.png"},
//         { name: "pawn", color: "white", x: 5, y: 2, image: "/games/Chess/whitepawn.png"},
//         { name: "pawn", color: "white", x: 6, y: 2, image: "/games/Chess/whitepawn.png"},
//         { name: "pawn", color: "white", x: 7, y: 2, image: "/games/Chess/whitepawn.png"},
//         { name: "pawn", color: "white", x: 8, y: 2, image: "/games/Chess/whitepawn.png"}],
        

//         [
//         { name: "pawn", color: "white", x: 1, y: 7, image: "/games/Chess/blackpawn.png"},
//         { name: "pawn", color: "white", x: 2, y: 7, image: "/games/Chess/blackpawn.png"},
//         { name: "pawn", color: "white", x: 3, y: 7, image: "/games/Chess/blackpawn.png"},
//         { name: "pawn", color: "white", x: 4, y: 7, image: "/games/Chess/blackpawn.png"},
//         { name: "pawn", color: "white", x: 5, y: 7, image: "/games/Chess/blackpawn.png"},
//         { name: "pawn", color: "white", x: 6, y: 7, image: "/games/Chess/blackpawn.png"},
//         { name: "pawn", color: "white", x: 7, y: 7, image: "/games/Chess/blackpawn.png"},
//         { name: "pawn", color: "white", x: 8, y: 7, image: "/games/Chess/blackpawn.png"}],
            
//         [
//         { name: "rook", color: "white", x: 1, y: 8, image: "/games/Chess/blackrook.png"},
//         { name: "knight", color: "white", x: 2, y: 8, image: "/games/Chess/blackknight.png"},
//         { name: "bishop", color: "white", x: 3, y: 8, image: "/games/Chess/blackbishop.png"},
//         { name: "queen", color: "white", x: 4, y: 8, image: "/games/Chess/blackqueen.png"},
//         { name: "king", color: "white", x: 5, y: 8, image: "/games/Chess/blackking.png"},
//         { name: "bishop", color: "white", x: 6, y: 8, image: "/games/Chess/blackbishop.png"},
//         { name: "knight", color: "white", x: 7, y: 8, image: "/games/Chess/blackknight.png"},
//         { name: "rook", color: "white", x: 8, y: 8, image: "/games/Chess/blackrook.png"}]
