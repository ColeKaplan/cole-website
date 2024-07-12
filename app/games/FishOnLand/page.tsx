import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function FishOnLand(){
    return(
        <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-slate-500'>
            <div>
                <UnityGame
                build="/games/FishOnLand/index.html"
                title="FishOnLand"
                width="960"
                height="500"
                />
            </div>
        </div>
    );
}
