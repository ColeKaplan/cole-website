'use client'
import ReactUnity from '@/components/ReactUnity';
import React, { useEffect } from 'react';
import Image from 'next/image'

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
            <meta name="description" content="In this game you are a fish trying to return to the ocean. Traverse nine levels without getting hit by the enemy to complete the game! Created for the Kenny Game Jam in 2019 by Benjamin Chern and Cole Kaplan." />
            <link rel="canonical" href="http://colekaplan.dev/games/FishOnLand" />
            
            <a href="/" className={`hover:text-[#A0BEE6] absolute w-[3dvw] h-[3dvw] ml-[.3dvw] mt-[.3dvw]`}>
            <Image src="/favicon/favicon-32x32.png" alt={`ColeKaplan Logo`} fill></Image>
            </a>

            <div className='flex flex-col items-center'> 
                <ReactUnity
                loaderUrlProp= "/games/FishOnLand/Build/Game Builds.loader.js"
                dataUrlProp= "/games/FishOnLand/Build/Game Builds.data"
                frameworkUrlProp= "/games/FishOnLand/Build/Game Builds.framework.js"
                codeUrlProp= "/games/FishOnLand/Build/Game Builds.wasm"
                />
            </div>

        </div>
    );
}
