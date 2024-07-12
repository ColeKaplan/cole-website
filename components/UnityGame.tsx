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
            <h1>{props.title}</h1>
            <h1>props height: {props.height}         screen height: {windowDimensions.height}</h1>
            <h1>Height being used: {Math.min(props.height, windowDimensions.height * .6)}</h1>
            <iframe src={props.build} 
                width={Math.min(props.width,windowDimensions.width * .83)} 
                height={Math.min(props.height, windowDimensions.height * .6)} 
                className='overflow-hidden'/>
            <h1>hi</h1>
        </div>
    );


}