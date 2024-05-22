import { usePrivy } from '@privy-io/react-auth';
import React from 'react';

export function LoginCTA() {
  const { login } = usePrivy();

  return (
    <div className="flex flex-col justify-center mt-8 w-fit m-auto">
      <h1 className="text-2xl m-4">
        Before playing please log in with your Privy wallet
      </h1>
      <button
        className="bg-black text-white font-bold py-2 px-4 rounded "
        onClick={login}
      >
        Log in
      </button>
    </div>
  );
}
