'use client';
import { useRouter } from 'next/navigation';

export default function SinglePlayer() {
  const router = useRouter();

  const navigateToNewPage = () => {
    router.push('/puzzle/0');
  };
  return (
    <button
      className="p-5 border border-black w-32 h-32 text-center"
      onClick={navigateToNewPage}
    >
      Singleplayer
    </button>
  );
}
