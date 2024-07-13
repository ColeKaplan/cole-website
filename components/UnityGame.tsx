'use client'

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function UnityGame(props: any) {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <div className="flex items-center justify-center flex-col overflow-x-hidden">
            <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>{props.title}</h1>
            <iframe src={props.build} 
            width={Math.min(props.width)} 
            height={Math.min(props.height)}  
            className='overflow-hidden'/>
        </div>
    );


}