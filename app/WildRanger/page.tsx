import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function WildRanger(){
    return(
        <div className=''>
            <div>
                <UnityGame
                build="/games/WildRanger/index.html"
                title="Wild Ranger"
                />
            </div>
        </div>
    );
}
