'use client';
import Image from 'next/image';
import logo from '../../../assets/zkomposer-logo-white.png';

export function Logo() {
  return <Image src={logo} alt="logo" className="mr-4 h-8 w-auto md:h-14" />;
}
