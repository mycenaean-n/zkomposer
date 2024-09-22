export function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-1/2 top-full mt-1.5 h-max w-max -translate-x-1/2 transform rounded bg-gray-200 px-3 py-2 text-sm text-gray-800 shadow-lg">
      {children}
    </div>
  );
}
