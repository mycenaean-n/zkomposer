'use client';
import Image from 'next/image';
import React from 'react';
import logo from '../assets/zKubeLogo.svg';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const { push } = useRouter();
  return (
    <Image
      src={logo}
      alt="logo"
      className="h-14 mr-4 w-auto cursor-pointer"
      onClick={() => push('/')}
    />
  );
}
