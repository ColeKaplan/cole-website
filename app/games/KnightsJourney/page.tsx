import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function KnightsJourney(){
    return(
        <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-slate-500'>
            <div>
                <UnityGame
                build="/games/KnightsJourney/index.html"
                title="Knight's Journey"
                width="960"
                height="630"
                />
            </div>
        </div>
    );
}
