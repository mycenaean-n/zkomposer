'use client';
import Image from 'next/image';
import logo from '../assets/zKubeLogo.svg';

export function Logo() {
  return <Image src={logo} alt="logo" className="mr-4 h-8 w-auto md:h-14" />;
}
