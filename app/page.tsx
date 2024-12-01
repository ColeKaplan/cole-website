import Card from '@/components/Card';
import React from 'react';
import SocialsLinks from '@/components/SocialsLinks';
import HorizontalCard from '@/components/HorizontalCard';
import './page.css'
import BrowserMainpage from '@/components/BrowserMainpage';
import MobileMainpage from '@/components/MobileMainpage';

export default function Home(){
    return(
        <div id="columnDivForPage" className='flex flex-col h-screen items-center bg-[#fffaf7]'>
        
            <BrowserMainpage/>
            <MobileMainpage/>

            {/* <SocialsLinks/> */}
            
        </div>
    );
}
