import { Poppins } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
  });

function Card(props: any) {

    return (
        <a href={props.link}>
        <button className='bg-[#bcd5f7] border-[#dd8b6b79] border-2 rounded-xl shadow-xl p-3 m-3 text-center
        active:bg-[#A0BEE6] active:text-black max-w-60 h-[17rem]'>
            <Image className='rounded-md mb-4 max-w-60 max-h-40' src={props.image} width={210} height={160} alt={`${props.title} picture`} priority={true}></Image>
            <h2 className={`${montserrat} font-black text-2xl`}>{props.title}</h2>
            <p className={`text-sm`}>{props.text}</p>
        </button>
        </a>
    );
}

export default Card