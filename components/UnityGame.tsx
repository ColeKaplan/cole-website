'use client'

import { useState, useEffect } from 'react';


export default function UnityGame(props: any) {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
        width,
        height
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    const [frame, setFrame] = useState(<></>);

    useEffect(() => {
        setFrame(<iframe src={props.build} 
        width={windowDimensions.width ? windowDimensions.width * props.widthPercent : props.width} 
        height={props.height}  
        className='overflow-hidden'/>);
    }, [windowDimensions.width]);


    return(
        <div className="flex items-center justify-center flex-col overflow-x-hidden">
            <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>{props.title}</h1>

            {frame};
        </div>
    );


}