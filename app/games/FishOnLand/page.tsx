import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function FishOnLand(){
    return(
        <div className='bg-slate-500 min-h-screen py-10'>
            <div>
                <UnityGame
                build="/games/FishOnLand/index.html"
                title="FishOnLand"
                width="1000"
                height="10000"
                />
            </div>
        </div>
    );
}
