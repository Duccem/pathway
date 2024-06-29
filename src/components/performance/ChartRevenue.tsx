"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartRevenue = ({ data }: { data: { name: string; total: number }[] }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">Revenue by course</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={400} className='mt-3'>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="888888"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="888888"
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartRevenue;