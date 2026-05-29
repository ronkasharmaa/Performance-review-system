interface ReportCardProps {
  title: string;
  value: string;
}

export default function ReportCard({
  title,
  value,
}: ReportCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}