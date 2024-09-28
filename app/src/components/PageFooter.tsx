import { GitHubIcon } from './GithubIcon';

export function PageFooter(): JSX.Element {
  return (
    <footer className="relative flex bg-gray-300 p-2">
      <div className="m-auto flex">
        <span className="mr-2 font-extrabold">Source:</span>
        <div className="mr-8 flex">
          <GitHubIcon />
        </div>
        <div>
          <span className="mr-2 font-extrabold">Inspired by:</span>
          <a
            rel="stylesheet"
            href="https://david-peter.de/cube-composer/"
            target="_blank"
            className="underline"
          >
            cube-composer
          </a>
        </div>
      </div>
    </footer>
  );
}
