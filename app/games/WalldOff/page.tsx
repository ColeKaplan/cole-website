import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WalldOff(){
    return(
        <div className='min-h-screen py-10 bg-slate-500'>
                <UnityGame
                build="/games/WalldOff/index.html"
                title="Walled Off"
                width="800"
                widthPercent=".75"
                height="10000"
                />
        </div>
    );
}
