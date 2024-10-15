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
            setWindowDimensions(getWindowDimensions());
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);


    return(
        <div className="flex items-center justify-center flex-col overflow-x-hidden">
            <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>{props.title}</h1>
            <iframe src={props.build} 
            width={windowDimensions.width != null ? windowDimensions.width * .75 : props.width} 
            height={props.height}  
            className='overflow-hidden'/>
        </div>
    );


}