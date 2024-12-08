'use client'
import Header from '@/components/Header';
import UnityGame from '@/components/UnityGame';
import React, { useEffect } from 'react';

export default function WalledOff(){

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
        <div className='h-auto bg-slate-500'>

            <title>Walled Off</title>
            <meta name="description" content="Wall of the skeletons to keep them away, but keep a path open to collect the coins that appear when the despawn." />
            <link rel="canonical" href="http://colekaplan.dev/games/WalledOff" />

            <header className='pb-10 min-w-full'>
                <Header />
            </header>
            <div className='flex flex-col items-center'> 
                <UnityGame
                build="/games/WalledOff/index.html"
                title="Walled Off"
                width="800"
                widthPercent=".75"
                heightPercent=".95"
                ratio=".5"
                />

                <p className='text-[#ffffff]'>Creators: 
                    <a href="https://jackwarren430.github.io/" className={`hover:text-[#A0BEE6]`}> Jack Warren</a>, 
                    Cole Kaplan
                </p>
                <p className='text-[#ffffff]'>I made Walled Off for the  Gwinnett County Public Library Game Jam 2024</p>
                <p className='text-[#ffffff]'>Walled Off won first place in the jam, embodying the theme &quot;Space Is Limited&quot;</p>
            </div>
        </div> 
    );
}
