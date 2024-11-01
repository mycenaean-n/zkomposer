import { Puzzle } from '@components/game/puzzle/Puzzle';
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <section className="flex flex-col">
      <Puzzle />
    </section>
  );
}
