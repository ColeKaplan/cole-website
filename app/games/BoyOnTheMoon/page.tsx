'use client'
import Header from '@/components/Header';
import BoyMoonComponent from '@/components/BoyMoonComponent';
import BoyMoonJS from '@/components/BoyMoonJS';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image'

export default function BoyMoon(){

    return(
        <div className='bg-slate-500 h-auto'>

            <title>BoyOnTheMoon</title>
            <meta name="description" content="A 3d graphic I made with OpenGL for my graphics class and translated to WebGL." />
            <link rel="canonical" href="http://colekaplan.dev/games/BoyMoon" />
            
            <a href="/" className={`hover:text-[#A0BEE6] absolute w-[3dvw] h-[3dvw] ml-[.3dvw] mt-[.3dvw] z-10`}>
            <Image src="/favicon/favicon-32x32.png" alt={`ColeKaplan Logo`} fill></Image>
            </a>

            <div className='flex flex-col items-center h-[100dvh]'> 
                <BoyMoonJS/>
            </div>

        </div>
    );
}
