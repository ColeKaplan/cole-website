'use client'
import React, { useEffect } from 'react';
import Chessboard from '@/components/ChessComponents/Chessboard';
import Header from '@/components/Header';


export default function Chess() {
    return (
        <div>


            <title>Chess</title>
            <meta name="description" content="Play two player chess or take on The Machine." />
            <link rel="canonical" href="http://colekaplan.dev/games/Chess" />


            <div className='pb-10 min-w-full'>
                <Header />
            </div>
            <div className='bg-[slate-500] sm:flex sm:flex-col h-auto hidden'>
                <h1 className='text-4xl text-center font-bold text-[#FFFFFF]'>Chess</h1>
                <div className='flex flex-col justify-center items-center min-h-screen pb-[20%]'>
                    <Chessboard />
                </div>
            </div>
            <div className='flex sm:hidden items-center justify-center text-[#FFFFFF] text-md'>
                <p> Please increase screen width or rotate screen </p>
            </div>
        </div>
    );
}

