import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WildRanger(){
    return(
        <div className='flex flex-col justify-items-start items-center h-auto pt-10 bg-slate-500'>
            <div>
                <UnityGame
                build="/games/WildRanger/index.html"
                title="Wild Ranger"
                width="1000"
                widthPercent=".75"
                heightPercent=".95"
                ratio=".62"
                />
            </div>
        </div>
    );
}
