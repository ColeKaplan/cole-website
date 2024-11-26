import ContactForm from '@/components/ContactForm';
import React from 'react';


export default function Contact(){
    return(
        <div>
            <div className='flex flex-col justify-items-start items-center min-h-screen py-10 bg-[#fffaf7]'>
                <h1 className='text-4xl font-bold text-[#000000]'>Contact Me</h1>
                <ContactForm/>
            </div>
        </div>
    );
}
