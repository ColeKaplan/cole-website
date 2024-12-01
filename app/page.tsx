import Card from '@/components/Card';
import React from 'react';
import SocialsLinks from '@/components/SocialsLinks';
import HorizontalCard from '@/components/HorizontalCard';
import './page.css'
import BrowserMainpage from '@/components/BrowserMainpage';
import MobileMainpage from '@/components/MobileMainpage';
import Header from '@/components/Header';

export default function Home(){
    return(
        <div id="columnDivForPage" className='flex flex-col h-screen items-center bg-[#fffaf7]'>
            <div className='pb-10 min-w-screen'>
                <Header />
            </div>
        
            <BrowserMainpage/>
            <MobileMainpage/>

            {/* <SocialsLinks/> */}
            
        </div>
    );
}
