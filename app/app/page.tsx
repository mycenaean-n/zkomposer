'use client';
import { redirect, useParams } from 'next/navigation';
import { ZKUBE_PUZZLESET_ADDRESS } from '../src/config';

export default function Home() {
  // const [id] = useLocalStorage('puzzleId', '0');
  const params = useParams();
  const id = params?.id ? String(params.id) : '0';
  const puzzleSet = params?.puzzleSet
    ? String(params.puzzleSet)
    : ZKUBE_PUZZLESET_ADDRESS;

  redirect(`/puzzle/${puzzleSet}/${id}`);
}
