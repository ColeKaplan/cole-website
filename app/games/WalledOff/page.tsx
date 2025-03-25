'use client'
import Header from '@/components/Header';
import ReactUnity from '@/components/ReactUnity';
import React, { useEffect } from 'react';
import Image from 'next/image'
import ReactUnityFixedDimensions from '@/components/ReactUnityFixedDimensions';

export default function WalledOff() {

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

    return (
        <div className='h-auto bg-slate-500'>

            <title>Walled Off</title>
            <meta name="description" content="Wall of the skeletons to keep them away, but keep a path open to collect the coins that appear when the despawn." />
            <link rel="canonical" href="http://colekaplan.dev/games/WalledOff" />

            <a href="/" className={`hover:text-[#A0BEE6] absolute w-[3dvw] h-[3dvw] ml-[.3dvw] mt-[.3dvw]`}>
                <Image src="/favicon/favicon-32x32.png" alt={`ColeKaplan Logo`} fill></Image>
            </a>

            <div className='flex flex-col items-center justify-center h-[100dvh]'>
                <ReactUnity
                    loaderUrlProp="/games/WalledOff/Build_Fullscreen/GCPL_Fullscreen.loader.js"
                    dataUrlProp="/games/WalledOff/Build_Fullscreen/GCPL_Fullscreen.data"
                    frameworkUrlProp="/games/WalledOff/Build_Fullscreen/GCPL_Fullscreen.framework.js"
                    codeUrlProp="/games/WalledOff/Build_Fullscreen/GCPL_Fullscreen.wasm"
                />
            </div>

        </div>
    );
}
