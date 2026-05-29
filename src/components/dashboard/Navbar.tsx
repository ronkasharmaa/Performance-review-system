"use client";

export default function Navbar() {
  return (
    <div className="w-full h-16 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-6">
      <h2 className="text-white text-xl font-semibold">
        Employee Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-500" />
      </div>
    </div>
  );
}