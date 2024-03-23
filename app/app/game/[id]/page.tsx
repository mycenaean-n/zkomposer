import { Game } from '../../../src/components/game/Game';

export default function Page({ id }: { id: string }) {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow h-96">
        <Game />
      </div>
      <footer className="bg-black h-20 mt-auto">
        <div className="text-white flex justify-between items-center h-full p-6">
          <h4 className="text-2xl font-bold">
            Blocks Left
            <br />
            <span className="text-xl font-normal">100</span>
          </h4>
          <h4 className="text-2xl font-bold">
            Score <br />
            <span className=" block text-xl font-normal text-right">5</span>
          </h4>
        </div>
      </footer>
    </div>
  );
}
