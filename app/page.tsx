import Card from '@/components/Card';
import React from 'react';
import SocialsLinks from '@/components/SocialsLinks';
import HorizontalCard from '@/components/HorizontalCard';
import './page.css'
import BrowserMainpage from '@/components/BrowserMainpage';
import MobileMainpage from '@/components/MobileMainpage';

export default function Home(){
    return(
        <div id="columnDivForPage" className='flex flex-col h-auto items-center pt-10 bg-[#fffaf7]'>
        
            <BrowserMainpage/>
            <MobileMainpage/>

            <div className='flex mt-10'>
                {/* <h1 className='text-4xl text-center font-bold text-[#AAAAAA] mb-4 2xl:hidden xl:hidden lg:hidden'>Please increase screen size to view games</h1> */}
            </div>
            {/* <SocialsLinks/> */}
            
        </div>
    );
}
