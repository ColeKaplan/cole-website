'use client'
import Card from '@/components/Card';
import React from 'react';
import SocialsLinks from '@/components/SocialsLinks';
import HorizontalCard from '@/components/HorizontalCard';
import './page.css'
import BrowserMainpage from '@/components/BrowserMainpage';
import MobileMainpage from '@/components/MobileMainpage';

export default function Home(){
    return(
        <div id="columnDivForPage" className='flex flex-col items-center bg-[#fffaf7]'>

            <title>Cole Kaplan</title>
            <meta name="description" content="Play games and test out projects developed by Cole Kaplan! Experience popular choices are Fish On Land, Draw for AI, Walled Off and more." />
            <link rel="canonical" href="http://colekaplan.dev" />

            <div className='hidden my-md:block'>
                <BrowserMainpage/>
            </div>
            <div className='flex my-md:hidden'>
                <MobileMainpage/>
            </div>

            {/* <SocialsLinks/> */}
            
        </div>
    );
}
