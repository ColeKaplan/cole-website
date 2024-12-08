import Header from '@/components/Header';
import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WildRanger(){
    return(
        <div className='h-auto bg-slate-500'>

            <title>Wild Ranger</title>
            <meta name="description" content="Use your hats to destroy turrets but be careful not to waste too many if you want a high score." />
            <link rel="canonical" href="http://colekaplan.dev/games/WildRanger" />

            <div className='pb-10 min-w-full'>
                <Header />
            </div>
            <div className='flex flex-col items-center'>
                <UnityGame
                build="/games/WildRanger/index.html"
                title="Wild Ranger"
                width="1000"
                widthPercent=".75"
                heightPercent=".95"
                ratio=".5"
                />
            
                <p className='text-[#ffffff] pt-1'>Creators: 
                    <a href="https://www.linkedin.com/in/benjaminchern/" className={`hover:text-[#A0BEE6]`}> Benjamin Chern</a>, 
                    <a href="https://jackwarren430.github.io/" className={`hover:text-[#A0BEE6]`}> Jack Warren</a>, 
                    <a href="https://www.jadenh.dev/" className={`hover:text-[#A0BEE6]`}> Jaden Hamer</a>, and
                    Cole Kaplan
                </p>
                <p className='text-[#ffffff]'>I made Wild Ranger for ScoreSpace Jam #26 in 2023</p>
                <p className='text-[#ffffff]'>I am most proud of it&apos;s complete playability and leaderboard</p>
            </div>
        </div>
    );
}
