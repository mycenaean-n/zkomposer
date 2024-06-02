import { usePrivy } from '@privy-io/react-auth';
import React from 'react';

export function LoginCTA() {
  const { login } = usePrivy();

  return (
    <div className="m-auto mt-8 flex flex-col justify-center">
      <h1 className="m-4 text-2xl">
        Before playing please log in with your Privy wallet
      </h1>
      <button
        className="m-auto w-fit rounded bg-black px-10 py-2 font-bold text-white"
        onClick={login}
      >
        Log in
      </button>
    </div>
  );
}
