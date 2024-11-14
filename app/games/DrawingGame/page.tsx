'use client'
import React, { useEffect, useState } from 'react';

export default function DrawingGame(){

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

    const [video, setVideo] = useState(<></>);

    useEffect(() => {

        const widthPercent = .5
        const heightPercent = .55
        const ratio = .8

        const windowWidth = windowDimensions.width ? windowDimensions.width * widthPercent : 300
        const windowHeight = windowDimensions.height ? (windowDimensions.height - 180) * heightPercent : 450 // - 100 for the header
        const useWidth = windowWidth * ratio < windowHeight

        const widthToUse = useWidth ? windowWidth : windowHeight / ratio
        const heightToUse = useWidth ? windowWidth * ratio : windowHeight

        setVideo(<video className='rounded-lg'
            src="/games/DrawingGame/DrawingVideo.mp4" 
            width={widthToUse}
            height={heightToUse}
            controls muted />);
    }, [windowDimensions]);


    return(
        <div className='bg-slate-500 h-auto pt-10'>
            <div className="flex flex-col items-center justify-center overflow-x-hidden">
                <h1 className='text-4xl font-bold text-[#FFFFFF] pb-4'>Drawing Game</h1>
                {/* {video} */}
                <iframe
                    src="https://colewawa-drawforai.hf.space"
                    width="850"
                    height="430"
                    className='overflow-hidden'
                ></iframe>

            </div>
        </div>
    );
}
