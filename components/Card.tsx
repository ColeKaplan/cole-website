import { Poppins } from 'next/font/google'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900'],
  });

function Card(props: any) {

    return (
        <button className='bg-[#fffce4] border-gray-200 border-2 rounded-xl shadow-lg p-3 m-3 text-center
        active:bg-[#fef8c9] active:text-black max-w-60'>
            <img className='rounded-md mb-4 max-w-max' src={props.image} width={200} alt="profile picture"></img>
            <h2 className={`${montserrat} font-black text-2xl`}>{props.title}</h2>
            <p className={`text-sm`}>{props.text}</p>
        </button>
    );
}

export default Card