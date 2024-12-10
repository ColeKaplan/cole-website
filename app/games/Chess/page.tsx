'use client'
import React, { useEffect } from 'react';
import Chessboard from '@/components/ChessComponents/Chessboard';
import Header from '@/components/Header';


export default function Chess() {

    {/* <!-- Google Tag Manager --> */}
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MMJ89G6J';
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, [])
    {/* <!-- End Google Tag Manager --> */}

    return (
        <div>


            <title>Chess</title>
            <meta name="description" content="Play two player chess or take on The Machine." />
            <link rel="canonical" href="http://colekaplan.dev/games/Chess" />


            <header className='pb-10 min-w-full'>
                <Header />
            </header>
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

