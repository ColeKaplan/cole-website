import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WalldOff(){
    return(
        <div className='h-auto pt-10 bg-slate-500'>
            <div className='flex flex-col items-center'> 
                <UnityGame
                build="/games/WalldOff/index.html"
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
