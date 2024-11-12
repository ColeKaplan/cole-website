import React from 'react';
import Chessboard from '@/components/ChessComponents/Chessboard';

export default function Chess() {
    return (
        <div className='bg-slate-500 flex flex-col'>
            <h1 className='text-4xl text-center font-bold text-[#FFFFFF] pt-4'>Chess Game</h1>
            <div className='flex flex-col justify-center items-center min-h-screen pb-[20%]'>
                <Chessboard />
            </div>
        </div>
    );
}

