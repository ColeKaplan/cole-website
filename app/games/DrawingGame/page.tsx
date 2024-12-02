'use client'
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';

export default function DrawingGame(){

    return(
        <div className='bg-slate-500 h-auto pb-10'>
            <div className='pb-10 min-w-full'>
                <Header />
            </div>
            <div className="sm:flex sm:flex-col items-center justify-center overflow-x-hidden hidden">
                <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>Drawing Game</h1>
                <p className='text-[#FFFFFF]'>Draw the prompted object. To get a new prompt, click &apos;Next&apos;</p>
                <p className='text-[#FFFFFF] pb-1'>The AI&apos;s top three guesses will be displayed under the prompt on the right</p>

                <iframe
                    src="https://colewawa-drawforai.hf.space"
                    width="850"
                    height="430"
                ></iframe>

                <p className='text-[#ffffff] pt-1'>Creators: 
                    <a href="https://www.linkedin.com/in/andrewdean-/" className={`hover:text-[#A0BEE6]`}> Andrew Dean</a>, 
                    <a href="https://www.linkedin.com/in/michael-stewart-642b48201/" className={`hover:text-[#A0BEE6]`}> Michael Stewart</a>, Cole Kaplan
                </p>
                <a href="https://medium.com/@colegkaplan/doodle-drawing-318f1a403e4c" className='text-[#ffffff] hover:text-[#A0BEE6]'>How we made this and other related machine learning projects</a>

            </div>
            <div className='flex sm:hidden items-center justify-center text-[#FFFFFF] text-md'>
                <p> Please increase screen width or rotate screen </p>
            </div>
        </div>
    );
}
