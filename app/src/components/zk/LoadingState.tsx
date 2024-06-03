export function LoadingState({
  textMain,
  textSub,
}: {
  textMain: string;
  textSub?: string;
}) {
  return (
    <div className="text-align-center flex h-full w-screen flex-grow flex-col items-center justify-center text-2xl">
      <h1>{textMain}</h1>
      <h1 className="mt-4">{textSub}</h1>
    </div>
  );
}
