'use client'
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';

export default function CredenceGame() {

    {/* <!-- Google Tag Manager --> */ }
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MMJ89G6J';
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, [])
    {/* <!-- End Google Tag Manager --> */ }

    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState(0);

    const submitGuess = () => {

    }

    return (
        <div className='bg-slate-500 h-auto'>

            <title>Credence Game</title>
            <meta name="description" content="Test and improve your confidence skills" />
            <link rel="canonical" href="http://colekaplan.dev/games/CredenceGame" />

            <header className='pb-10 min-w-full'>
                <Header />
            </header>
            <div className='flex flex-col items-center'>
                <p className='text-whjite'>Score: {score}</p>

                <div className='text-white'>
                    <p className='mt-8'>Which has a bigger population? </p>
                    <p>A: Georgia the country</p>
                    <p>B: Georgia the state</p>
                </div>

                <div className='flex gap-5 mt-24'>
                    <input className={`border-2 p-2 rounded-md 
                        ${guess === 0 ? 'bg-[#6fc8ff]' : 'bg-[#FFFFFF] hover:bg-[#a5d9f9]'}
                        `} type="button" value="A" onClick={() => {
                            setGuess(0);
                        }} />
                    <input className={`border-2 p-2 rounded-md 
                        ${guess === 1 ? 'bg-[#6fc8ff]' : 'bg-[#FFFFFF] hover:bg-[#a5d9f9]'}
                        `} type="button" value="B" onClick={() => {
                            setGuess(1);
                        }} />
                </div>

                <input className="mt-8 border-2 p-2 rounded-md bg-[#FFFFFF] hover:bg-[#a5d9f9]" type="button" value="Submit" onClick={() => submitGuess()} />
            </div>
        </div>
    );
}
