import React from 'react';
import ChessSquare from '@/components/ChessComponents/ChessSquare';

export default function Chess(){
    return(
        <div className='mt-16'>
            <div>
                <ChessSquare 
                position='e1'
                />
            </div>
        </div>
    );
}

