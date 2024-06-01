import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function FishOnLand(){
    return(
        <div className='mt-16'>
            <div>
                <UnityGame
                build="/games/FishOnLand/index.html"
                title="FishOnLand"
                />
            </div>
        </div>
    );
}
