import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WildRanger(){
    return(
        <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-slate-500'>
            <div>
                <UnityGame
                build="/games/WildRanger/index.html"
                title="Wild Ranger"
                width="1000"
                widthPercent=".75"
                height="10000"
                />
            </div>
        </div>
    );
}
