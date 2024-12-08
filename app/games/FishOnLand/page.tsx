'use client'
import Header from '@/components/Header';
import UnityGame from '@/components/UnityGame';
import React, { useEffect } from 'react';

export default function FishOnLand(){

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

    return(
        <div className='bg-slate-500 h-auto'>

            <title>Fish On Land</title>
            <meta name="description" content="Draw the prompt and get the AI to guess what you are drawing." />
            <link rel="canonical" href="http://colekaplan.dev/games/FishOnLand" />

            <header className='pb-10 min-w-full'>
                <Header />
            </header>
            <div className='flex flex-col items-center'> 
                <UnityGame
                build="/games/FishOnLand/index.html"
                title="Fish On Land"
                instructions="Since we didn't have time to make an instructions page... Everything is an enemy and kills you"
                instructions2="Use arrow keys to move and jump"
                width="1000"
                widthPercent=".75"
                heightPercent=".8"
                ratio=".5"
                />

                <p className='text-[#ffffff] pt-1'>Creators: 
                    <a href="https://www.linkedin.com/in/benjaminchern/" className={`hover:text-[#A0BEE6]`}> Benjamin Chern</a>, 
                    Cole Kaplan
                </p>
                <p className='text-[#ffffff]'>I made Fish On Land for my first ever Game Jam, the Kenney Jam 2019</p>
                <p className='text-[#ffffff]'>Even though it is simple, it remains my favorite game to play of all my Game Jam entries</p>
            </div>
        </div>
    );
}
