import Card from '@/components/Card';
import React from 'react';
import SocialsLinks from '@/components/SocialsLinks';
import HorizontalCard from '@/components/HorizontalCard';
import './page.css'
import BrowserMainpage from '@/components/BrowserMainpage';
import MobileMainpage from '@/components/MobileMainpage';

export default function Home(){
    return(
        <div id="columnDivForPage" className='flex flex-col h-dvh items-center bg-[#fffaf7]'>
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
