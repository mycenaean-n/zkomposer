'use client';
import { Actions } from '../../src/components/game/actions/Actions';
import { PuzzleLayout } from '../../src/components/game/layout/Layout';
import { Scene } from '../../src/components/game/scene/Scene';
import { Sidepanel } from '../../src/components/game/sidepanel/Sidepanel';

export default function Page() {
  return (
    <section className="flex flex-col">
      <PuzzleLayout
        scene={({ className }) => <Scene className={className} />}
        actions={({ className }) => (
          <Actions gameMode="singleplayer" className={className} />
        )}
        stats={({ className }) => <Sidepanel className={className} />}
      />
    </section>
  );
}
