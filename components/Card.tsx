import { Poppins } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import React from 'react';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
  });

function Card(props: any) {

    return (
        <a href={props.link}>
        <button className='bg-[#91a6c5] border-[#53647a] border-2 rounded-xl shadow-xl p-3 m-3 text-center
        active:bg-[#91b7e9] active:text-black hover:bg-[#A0BEE6] hover:text-black
         max-w-60 h-[17rem]'>
            <Image className='rounded-md mb-4 max-w-60 max-h-40' src={props.image} width={210} height={160} alt={`${props.title} picture`} priority={true}></Image>
            <h2 className={`${montserrat} font-black text-2xl`}>{props.title}</h2>
            <p className={`text-sm`}>{props.text}</p>
        </button>
        </a>
    );
}

export default Card