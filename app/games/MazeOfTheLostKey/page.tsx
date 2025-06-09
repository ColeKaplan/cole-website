'use client'
import Header from '@/components/Header';
import UnityGame from '@/components/UnityGame';
import React, { useEffect } from 'react';

export default function MazeOfTheLostKey(){

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

            <title>Maze Of The Lost Key</title>
            <meta name="description" content="Get through the enemies to collect 3 keys and escape the dungeon" />
            <link rel="canonical" href="http://colekaplan.dev/games/MazeOfTheLostKey" />

            <header className='pb-10 min-w-full'>
                <Header />
            </header>
            <div className='flex flex-col items-center'>
                <UnityGame
                build="/games/MazeOfTheLostKey/index.html"
                title="Maze Of The Lost Key"
                width="800"
                widthPercent=".75"
                heightPercent=".85"
                ratio=".6"
                />

                <p className='text-[#ffffff]'>I made Maze of The Lost Key for CS 4455: Game Design in Spring 2025</p>
                <p className='text-[#ffffff]'>My contribution was the enemy assets, fighting mechanics of the enemy and player, all collisions, key collection, and environment interactions</p>
            </div>
        </div>
    );
}
