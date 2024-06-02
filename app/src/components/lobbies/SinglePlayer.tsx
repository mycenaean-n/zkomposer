'use client';
import { useRouter } from 'next/navigation';

export default function SinglePlayer() {
  const router = useRouter();

  const navigateToNewPage = () => {
    router.push('/puzzle/0');
  };
  return (
    <button
      className="h-32 w-32 border border-black p-5 text-center"
      onClick={navigateToNewPage}
    >
      Singleplayer
    </button>
  );
}
