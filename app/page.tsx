'use client'
import Card from '@/components/Card';
import React, { useEffect } from 'react';
import SocialsLinks from '@/components/SocialsLinks';
import HorizontalCard from '@/components/HorizontalCard';
import './page.css'
import BrowserMainpage from '@/components/BrowserMainpage';
import MobileMainpage from '@/components/MobileMainpage';

export default function Home(){

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
        <div id="columnDivForPage" className='flex flex-col items-center bg-[#fffaf7]'>

            <title>Cole Kaplan</title>
            <meta name="description" content="Play games and test out projects developed by Cole Kaplan! Experience popular choices like Fish On Land, Draw for AI, Walled Off and more." />
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
