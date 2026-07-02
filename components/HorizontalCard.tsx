import { Poppins } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import React from 'react';
import './HorizontalCard.css';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
});

function HorizontalCard(props: any) {
    const isTextRight = props.isTextRight
    const router = useRouter();

    return (
        <div /* Should be an <a> tag but it doesn't let me nest <a> tags */
            onClick={() => router.push(props.link)} className='bg-[#c2e2f9] border-2 rounded-xl shadow-xl p-3 m-3 text-center
        active:bg-[#82cbff] active:text-black hover:bg-[#9fd7ff] hover:text-black max-w-xl
        grow cursor-pointer'>
            <div className={`flex ${isTextRight ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                <div className="">
                    <Image className='rounded-md max-w-60 max-h-40' src={props.image} width={420} height={320} alt={`${props.title} picture`} priority={true}></Image>
                </div>
                <div className="ml-4 mr-4">
                    <h2 className={`${montserrat} font-black text-2xl`}>{props.title}</h2>
                    <p className={`text-sm`}>{props.text}</p>
                    {props.githubLink &&
                        <a
                            href={props.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#676767] absolute bottom-2 right-2 active:text-[#949494]"
                        >
                            <FaGithub size={30} />
                        </a>
                    }
                </div>
            </div>
        </div>
    );
}

export default HorizontalCard