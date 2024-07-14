import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';


function SocialsLinks(){


    return(
        <div id="bottomPageLinks" className='flex border border-[#d4edff] p-1 
        bg-[#d4edff] rounded space-x-2'>
            <Link href="https://github.com/ColeKaplan" target="_blank" rel="noopener noreferrer" 
            className='hover:text-[#A0BEE6]'>
                <FaGithub size={30}/>
            </Link>
            
            <Link href="https://linkedin.com/in/colekaplan" target="_blank" rel="noopener noreferrer" 
            className='hover:text-[#A0BEE6]'>
                <FaLinkedin size={30}/>
            </Link>
        </div>

    );
}

export default SocialsLinks