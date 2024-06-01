import UnityGame from '@/components/UnityGame';
import React from 'react';

export default function KnightsJourney(){
    return(
        <div className=''>
            <div>
                <UnityGame
                build="/games/KnightsJourney/index.html"
                title="Knight's Journey"
                />
            </div>
        </div>
    );
}
