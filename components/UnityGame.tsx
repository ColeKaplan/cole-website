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

        const windowWidth = windowDimensions.width ? windowDimensions.width * props.widthPercent : props.width
        const windowHeight = windowDimensions.height ? (windowDimensions.height - 180) * props.heightPercent : props.height // - 100 for the header
        const useWidth = windowWidth * props.ratio < windowHeight

        const widthToUse = useWidth ? windowWidth : windowHeight / props.ratio
        const heightToUse = useWidth ? windowWidth * props.ratio : windowHeight

        setFrame(<iframe src={props.build} 
        width={widthToUse} 
        height={heightToUse}  
        className='overflow-hidden'/>);

    }, [windowDimensions]);


    return(
        <div className="flex flex-col items-center justify-center overflow-x-hidden">
            <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>{props.title}</h1>

            {frame}

            
        </div>
    );


}