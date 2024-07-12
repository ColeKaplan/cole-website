import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WalldOff(){
    return(
        <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-slate-500'>
            <div>
                <UnityGame
                build="/games/WalldOff/index.html"
                title="WalldOff"
                width="960"
                height="600"
                />
            </div>
        </div>
    );
}
