import './styles.css';

type PuzzleLayoutProps = {
  scene: (props: { className: string }) => React.ReactNode;
  actions: (props: { className: string }) => React.ReactNode;
  stats: (props: { className: string }) => React.ReactNode;
};

export function PuzzleLayout({ scene, actions, stats }: PuzzleLayoutProps) {
  return (
    <div className="layout-grid">
      {scene({ className: 'grid-area-game' })}
      {actions({ className: 'grid-area-actions' })}
      {stats({ className: 'grid-area-leaderboard' })}
    </div>
  );
}
