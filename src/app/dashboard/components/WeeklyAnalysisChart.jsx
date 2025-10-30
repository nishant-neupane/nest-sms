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
  { name: "T", ntc:   180, ncell: 100 },
  { name: "W", ntc: 90, ncell: 120 },
  { name: "T", ntc: 60, ncell: 80 },
  { name: "F", ntc: 50, ncell: 70 },
  { name: "S", ntc: 30, ncell: 40 },
];
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        {/* <p className="text-sm font-semibold mb-1">{payload[0].payload.name}</p> */}
        <p
          className="text-sm text-[#000000] flex justify-start items-center gap-2
        "
        >
          <span className="inline-block w-3.5 h-3.5 bg-[#045CCF] rounded-full" />
          {payload[0].payload.ntc}
        </p>
        <p className="text-sm text-[#000000] flex justify-start items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 bg-[#8CBEFF] rounded-full" />
          {payload[0].payload.ncell}
        </p>
        <p className="font-medium text-sm text-[#8D8D8D] mt-2 leading-[100%]">
          Total:{" "}
          <span className="text-[#000000]">
            {payload[0].payload.ntc + payload[0].payload.ncell}
          </span>
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
          <BarChart data={CHART_DATA}>
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
              ticks={[0, 100, 200, 250]}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Bar
              dataKey="ncell"
              fill="#8CBEFF"
              radius={[100, 100, 100, 100]}
              maxBarSize={60}
            />
            <Bar
              dataKey="ntc"
              fill="#045CCF"
              radius={[100, 100, 100, 100]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
