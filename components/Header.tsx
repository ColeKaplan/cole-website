'use client';

import React from 'react';
import { Poppins } from "next/font/google";
import { Roboto } from 'next/font/google'
import { Bars3Icon } from '@heroicons/react/16/solid';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import './Header.css';



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});


function Header() {

  const pathname = usePathname()


  return (
    <>
    <header className='flex flex-col justify-between p-4'>
      <div>
        <h1 className={`text-2xl ${poppins.className}`}>Cole Kaplan</h1>
      </div>
      <div className={`flex justify-between ${roboto.className}`}>
        <p>Software Engineer & Game Designer @ Georgia Tech</p>
        <div className=' hidden md:flex flex-row space-x-2'>
          <a href="/" className={`hover:text-blue-500 ${pathname === '/' ? 'active-link' : ''} ${roboto.className}`}>Home</a>
          <p>|</p>
          <a href="/about" className={`hover:text-blue-500 ${pathname === '/about' ? 'active-link' : ''} ${roboto.className}`}>About</a>
          <p>|</p>
          <a href="/resume" className={`hover:text-blue-500 ${pathname === '/resume' ? 'active-link' : ''} ${roboto.className}`}>Resume</a>
          <p>|</p>
          <a href="/contact" className={`hover:text-blue-500 ${pathname === '/contact' ? 'active-link' : ''} ${roboto.className}`}>Contact</a>
        </div>
        <div className='2xl:hidden xl:hidden lg:hidden md:hidden sm:flex justify-end'>
          <Popover>
            <PopoverTrigger><Bars3Icon className='h-6 w-6'></Bars3Icon></PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
    </>
  );
}



export default Header;
