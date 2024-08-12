'use client';
import Image from 'next/image';
import React from 'react';
import logo from '../assets/zKubeLogo.svg';
import { useRouter } from 'next/navigation';

export function Logo() {
  const { push } = useRouter();
  return (
    <Image
      src={logo}
      alt="logo"
      className="mr-4 h-8 w-auto cursor-pointer md:h-14"
      onClick={() => push('/')}
    />
  );
}
