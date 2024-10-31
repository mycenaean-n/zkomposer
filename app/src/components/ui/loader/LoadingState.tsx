import './styles.css';

export function LoadingState() {
  return (
    <div className="relative top-[calc(30vh-10rem)] flex h-40 items-end justify-center">
      {/* Red Cubes */}
      <div className="flex space-x-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`red-${i}`}
            className="animate-stack h-8 w-8 bg-red-500"
          ></div>
        ))}
      </div>
      {/* Blue Cubes */}
      <div className="absolute bottom-9 flex space-x-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`blue-${i}`}
            className="animate-stack h-8 w-8 bg-blue-500 opacity-0"
            style={{
              animationDelay: '0.5s',
            }}
          ></div>
        ))}
      </div>
      {/* Yellow Cubes */}
      <div className="absolute bottom-[4.5rem] flex space-x-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`yellow-${i}`}
            className="animate-stack h-8 w-8 bg-yellow-500 opacity-0"
            style={{
              animationDelay: '1s',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
