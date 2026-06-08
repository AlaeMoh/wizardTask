"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Alchemists", value: 45, color: "#D0BCFF" },
  { name: "Transmuters", value: 30, color: "#FFB95F" },
  { name: "Conjurers", value: 25, color: "#4a5280" },
];

const TOTAL = "1.2k";

export default function Donut() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      <div
        style={{
          background: "#0D1C2D",
          border: "2px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          maxWidth: "360px",
          fontFamily: "'DM Sans', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
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
            Wizards by Specialty
          </h2>
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

        {/* Donut wrap */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{ position: "relative", width: "120px", height: "120px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {/* Background ring */}
                <Pie
                  data={[{ value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={58}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  isAnimationActive={false}
                  stroke="none"
                >
                  <Cell fill="#1C2B3C" />
                </Pie>

                {/* Data ring */}
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={58}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  paddingAngle={2}
                  stroke="none"
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center label overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#e8eaf6",
                  lineHeight: 1,
                }}
              >
                {TOTAL}
              </span>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#4a5280",
                  marginTop: "2px",
                }}
              >
                Total
              </span>
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {data.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.72rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: "#7a82a8",
                    flex: 1,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    color: "#4a5280",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
