"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { phase: "", value: 340 },
  { phase: "", value: 210 },
  { phase: "Moon Start", value: 290 },
  { phase: "", value: 510 },
  { phase: "", value: 390 },
  { phase: "Full Moon", value: 430 },
  { phase: "", value: 620 },
  { phase: "", value: 370 },
  { phase: "", value: 180 },
  { phase: "Moon End", value: 150 },
  { phase: "", value: 410 },
];

const BAR_FILL = "#D0BCFF";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1C2B3C",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "8px",
          padding: "8px 14px",
          color: "#D4E4FA",
          fontSize: "13px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {payload[0].value.toLocaleString()} 
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = ({ x, y, payload }: any) => {
  if (!payload.value) return null;
  return (
    <text
      x={x}
      y={y + 16}
      textAnchor="middle"
      fill="#D0BCFF"
      fontSize={11}
      fontFamily="'DM Sans', sans-serif"
      opacity={0.7}
    >
      {payload.value}
    </text>
  );
};

export default function Registry() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=DM+Sans:wght@400;500&display=swap');

        .registry-bar-cell {
          transition: opacity 0.2s;
        }
        .registry-bar-cell:hover {
          opacity: 0.8;
        }
      `}</style>

      <div
        style={{
          background: "#0D1C2D",
          border: "2px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          maxWidth: "680px",
          fontFamily: "'DM Sans', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#e8eaf6",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.5px",
              fontFamily: "'Cinzel', serif",
            }}
          >
            Registry Activity
          </h2>
          <span
            style={{
              background: "#273647",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "6px",
              padding: "0.2rem 0.6rem",
              color: "#D0BCFF",
              fontSize: "0.65rem",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Last 30 Days
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "0.5px",
            backgroundColor: "#D0BCFF",
            opacity: 0.15,
            width: "100%",
            marginBottom: "1.25rem",
          }}
        />

        {/* Chart */}
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            barCategoryGap="28%"
            margin={{ top: 8, right: 0, left: -24, bottom: 8 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BAR_FILL} stopOpacity={0.75} />
                <stop offset="100%" stopColor={BAR_FILL} stopOpacity={0.08} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="phase"
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick />}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#4a5280",
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(208,188,255,0.04)" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="url(#barGradient)">
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill="url(#barGradient)"
                  className="registry-bar-cell"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
