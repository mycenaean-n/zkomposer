'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import logo from '../assets/zKubeLogo.svg';

export function Logo() {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="logo"
        className="mr-4 h-8 w-auto cursor-pointer md:h-14"
      />
    </Link>
  );
}
