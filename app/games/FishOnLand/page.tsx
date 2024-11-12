import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function FishOnLand(){
    return(
        <div className='bg-slate-500 h-auto pt-10'>
            <div>
                <UnityGame
                build="/games/FishOnLand/index.html"
                title="FishOnLand"
                width="1000"
                widthPercent=".75"
                heightPercent=".8"
                ratio=".5"
                />
            </div>
        </div>
    );
}
