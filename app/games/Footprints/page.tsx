'use client'
import Header from '@/components/Header';
import React, { useEffect } from 'react';
import Image from 'next/image'
import ImageSlider from '@/components/ImageSlider';

export default function Footprints(){

    {/* <!-- Google Tag Manager --> */}
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MMJ89G6J';
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, [])
    {/* <!-- End Google Tag Manager --> */}

    const IMAGES = [
        { url: "/games/Footprints/OnStage.jpg", alt: "Photos on stage as winners!" },
        { url: "/games/Footprints/Footprints.png", alt: "Footsteps Outside" },
        { url: "/games/Footprints/Message.png", alt: "Bubble Message" },
        { url: "/games/Footprints/Prizes.jpeg", alt: "Getting our prizes" },
      ]

    return(
        <div className='h-auto bg-slate-500'>

            <title>Footprints</title>
            <meta name="description" content="MIT Reality Hack 2025 Project Footprints. Footprints was the winner on the Snap Spectacles track!" />
            <link rel="canonical" href="http://colekaplan.dev/games/Footprints" />

            <header className='pb-10 min-w-full'>
                <Header />
            </header>


            <div className='flex flex-col items-center text-[#ffffff]'>
                <p className='text-5xl pb-2'>Footprints</p>
                <p className='text-xl'>MIT Reality Hack 2025 Project Footprints</p>
                <p>Footprints was the winner on the Snap Spectacles track!</p>
            </div>

            <div className=' max-w-[50dvw] w-[100%] aspect-[10/6] m-auto mt-8 mb-4'>
                {/* style={{ maxWidth: "50dvw", width: "100%", aspectRatio: "10 / 6", margin: "0 auto" }}> */}
                <ImageSlider images={IMAGES} />
            </div>

            <div className='flex flex-col items-center'>
                {/* <ImageSlider/> */}
                {/* <Image className='rounded-md' src="/games/Footprints/OnStage.jpg" width={646/1.5} height={484/1.5} alt={"On stage picture"} priority={true}></Image> */}

            </div>

            
            <div className='text-[#ffffff] pl-4'>
                <p className='text-2xl pb-2'>Inspiration:</p>
                <p className='text-md pb-4'>
                    We were inspired by the incredible immersive outdoor experience on Snap Spectacles along with their unique social interactions<br/>
                    While most XR is built to keep you isolated in your home, Spectacles gives us the tools to bring people into their community<br/>
                </p>
                <p className='text-2xl pb-2'>
                    The application has three key modes:
                </p>
                <p className='text-md pb-4'>
                    Searching: You start in this mode, seeing all the trails and messages people have left around you. From here you have two options <br/>
                    Creating: You can build your own trails for others to follow, leaving footprints and message bubbles narrating your experience <br/>
                    Exploring: You join an existing trail and follow the path of footprints while interacting with trail specific messages and leaving your own
                </p>
                <p className='text-2xl pb-2'>
                    How we built it:
                </p>
                <p className='text-md pb-4'>
                    We built this on Snap Spectacles using their new feature of Anchor Points that allow objects to exist geospacially across sessions<br/>
                    In addition we make use of their persistent storage to record everyone&apos;s messages so that other users can play them back<br/>
                    By comparing the user&apos;s position to detected Anchor Points around them, we can craft their AR journey right in front of their eyes
                </p>
                <p className='text-2xl pb-2'>
                    Challenges we ran into:
                </p>
                <p className='text-md pb-4'>
                    The key challenge was designing an experience with easy controls that does not hinder your interaction with the world<br/>
                    We place minimal graphics on screen, just a trailhead marker, footprints on the ground, and floating message bubbles<br/>
                    All other interaction is through voice commands using the Spectacles advanced voice recognition (with an expandable UI for those that prefer it)
                </p>
                <p className='text-2xl pb-2'>
                    What&apos;s next for Footprints:
                </p>
                <p className='text-md pb-4'>
                    1. Add photos or 3d scans to show what a path looked like at different periods of time or in different seasons<br/>
                    2. Increase vibrance of footsteps based on how many people have gone on that path<br/>
                    3. Apply this technology to countless fields such as creating running paths, guided tours, hikes, and even as an improvement to directions<br/>
                </p>
                
            </div>

            <div className='flex flex-col items-center'>
            
                <p className='text-[#ffffff] pt-1'>Creators: 
                    <a href="https://www.linkedin.com/in/pranavasinghal/" className={`hover:text-[#A0BEE6]`}> Pranava Singhal</a>, Cole Kaplan,  
                    <a href="https://www.linkedin.com/in/gordon-rose-asher/" className={`hover:text-[#A0BEE6]`}> Gordon Rose</a>, 
                    Sharon Chen, and Chandler
                </p>
                <p className='text-[#ffffff]'><a href="https://github.com/ColeKaplan/Footprints" className={`hover:text-[#A0BEE6]`}>Checkout out our github</a></p>
            </div>
        </div>
    );
}
