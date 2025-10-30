import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CHART_DATA = [
  { name: "S", ntc: 40, ncell: 60 },
  { name: "M", ntc: 70, ncell: 90 },
  { name: "T", ntc: 80, ncell: 100 },
  { name: "W", ntc: 90, ncell: 120 },
  { name: "T", ntc: 60, ncell: 80 },
  { name: "F", ntc: 50, ncell: 70 },
  { name: "S", ntc: 30, ncell: 40 },
];
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold mb-1">{payload[0].payload.name}</p>
        <p className="text-sm text-blue-700">NTC: {payload[0].payload.ntc}</p>
        <p className="text-sm text-blue-300">
          NCell: {payload[0].payload.ncell}
        </p>
      </div>
    );
  }
  return null;
};

export const WeeklyAnalysisChart = () => (
  <div className="col-span-2">
    <div className="bg-white px-4 pt-4 rounded-lg">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg text-black leading-[100%] mb-4">
          Weekly Analysis
        </h2>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-4 font-semibold text-sm text-black leading-[100%]">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3.5 h-3.5 bg-[#045CCF] rounded-full"></span>
              NTC
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3.5 h-3.5 bg-[#8CBEFF] rounded-full"></span>
              NCell
            </span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={CHART_DATA}
            barGap={-54}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14 }}
              ticks={[0, 50, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Bar
              dataKey="ncell"
              fill="#8CBEFF"
              radius={[50, 50, 50, 50]}
              maxBarSize={60}
            />
            <Bar
              dataKey="ntc"
              fill="#045CCF"
              radius={[50, 50, 50, 50]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
