import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WalldOff(){
    return(
        <div className='h-auto pt-10 bg-slate-500'>
                <UnityGame
                build="/games/WalldOff/index.html"
                title="Walled Off"
                width="800"
                widthPercent=".75"
                heightPercent=".95"
                ratio=".65"
                />
        </div>
    );
}
