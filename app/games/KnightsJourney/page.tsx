import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function KnightsJourney(){
    return(
        <div className='bg-slate-500 h-auto pt-10'>
            <div className='flex flex-col items-center'>
                <UnityGame
                build="/games/KnightsJourney/index.html"
                title="Knight's Journey"
                width="800"
                widthPercent=".75"
                heightPercent=".85"
                ratio=".6"
                />
            
                <p className='text-[#ffffff] pt-1'>Creators: 
                    <a href="https://www.linkedin.com/in/benjaminchern/" className={`hover:text-[#A0BEE6]`}> Benjamin Chern</a>, 
                    Cole Kaplan
                </p>
                <p className='text-[#ffffff]'>I made Knight's Journey for a forgotten game jam in 2021</p>
                <p className='text-[#ffffff]'>The focus of this game was to improve my skills in simulated physics, character animations, and collision calculations</p>
            </div>
        </div>
    );
}
