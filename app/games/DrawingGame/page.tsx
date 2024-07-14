import React from 'react';

export default function DrawingGame(){
    return(
        <div className='mt-16'>
            <div className="flex items-center justify-center flex-col overflow-x-hidden">
                <iframe src="/games/DrawingGame/index.html" 
                width="500" 
                height="500"
                className=''/>
            </div>
        </div>
    );
}
