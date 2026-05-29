interface StatsCardProps {
  title: string;
  value: string;
}

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <p className="text-zinc-400 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}