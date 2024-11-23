'use client'
import React, { useEffect, useState } from 'react';

export default function DrawingGame(){

    return(
        <div className='bg-slate-500 h-auto pt-10'>
            <div className="flex flex-col items-center justify-center overflow-x-hidden">
                <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>Drawing Game</h1>
                <p className='text-[#FFFFFF]'>Draw the prompted object. To get a new prompt, click 'Next'</p>
                <p className='text-[#FFFFFF] pb-1'>The AI's top three guesses will be displayed under the prompt on the right</p>

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
        </div>
    );
}
