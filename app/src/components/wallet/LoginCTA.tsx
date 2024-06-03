import { usePrivy } from '@privy-io/react-auth';
import React from 'react';

export function LoginCTA() {
  const { login } = usePrivy();

  return (
    <div className="m-auto mt-8 flex flex-col justify-center">
      <h1 className="m-4 text-center text-2xl">
        Before playing please log in with your Privy wallet
      </h1>
      <button className="btn-primary-rounded m-auto w-40" onClick={login}>
        Log in
      </button>
    </div>
  );
}
