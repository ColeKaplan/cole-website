import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function KnightsJourney(){
    return(
        <div className='bg-slate-500 h-auto pt-10'>
            <div>
                <UnityGame
                build="/games/KnightsJourney/index.html"
                title="Knight's Journey"
                width="800"
                widthPercent=".75"
                heightPercent=".85"
                ratio=".65"
                />
            </div>
        </div>
    );
}
