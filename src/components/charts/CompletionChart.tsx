"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { completionData } from "@/data/analytics";

export default function CompletionChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-[350px]">
      <h2 className="text-white text-xl font-semibold mb-6">
        Review Completion
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={completionData}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="completed" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}