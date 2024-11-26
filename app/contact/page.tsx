import ContactForm from '@/components/ContactForm';
import React from 'react';


export default function Contact(){
    return(
        <div>
            <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-[#slate-500]'>
                <h1 className='text-4xl font-bold text-[#dfdfdf]'>Contact Me</h1>
                <ContactForm/>
            </div>
        </div>
    );
}
