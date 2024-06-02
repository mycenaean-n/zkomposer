'use client';
import { useRouter } from 'next/navigation';

export default function SinglePlayer() {
  const router = useRouter();

  const navigateToNewPage = () => {
    router.push('/puzzle/0');
  };
  return (
    <button className="btn-transparent h-32 w-32" onClick={navigateToNewPage}>
      Singleplayer
    </button>
  );
}
