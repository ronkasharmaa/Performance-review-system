interface OKRCardProps {
  objective: string;
  progress: number;
}

export default function OKRCard({
  objective,
  progress,
}: OKRCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-white text-lg font-semibold">
        {objective}
      </h2>

      <div className="mt-5">
        <div className="flex justify-between mb-2">
          <span className="text-zinc-400">
            Progress
          </span>

          <span className="text-white font-medium">
            {progress}%
          </span>
        </div>

        <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-purple-600 h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}