export function LoadingState({
  textMain,
  textSub,
}: {
  textMain: string;
  textSub?: string;
}) {
  return (
    <div className="text-align-center mt-48 flex h-full w-screen flex-grow flex-col items-center justify-center text-2xl">
      <h1>{textMain}</h1>
      <h2 className="mt-4">{textSub}</h2>
    </div>
  );
}
