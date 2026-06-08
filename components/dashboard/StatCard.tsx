import React from 'react'
import "../../styles/styles.css"

const stats = [
  {
    label: "TOTAL REGISTERED WIZARDS",
    value: "1,248",
    valueType: "purple", 
    change: "↑ +14% from last moon",
    changeType: "gold",
  },
  {
    label: "ACTIVE ELIXIRS",
    value: "856",
    valueType: "gold",
    change: "↑ 3 new formulas registered",
    changeType: "gold",
  },
  {
    label: "PENDING VERIFICATIONS",
    value: "12",
    valueType: "danger",
    change: "! 1 requires High Council approval",
    changeType: "danger",
  },
];

export default function StatCard() {
  return (
    <div className='bgmain cards container-fluid'>
      <div className="header grey mb-4">
        <h3>Wizarding Registry Dashboard</h3>
        <p>Overseeing the mystical equilibrium across all magical realms.</p>
      </div>

      <div className="stats-row">
        {/* 1. Added valueType to the destructured arguments below */}
        {stats.map(({ label, value, valueType, change, changeType }) => (
          <div className="stat-card grey" key={label}>
            <div className="stat-label grey">{label}</div>

            {/* 2. Switched the checks to look at valueType instead of changeType */}
            <div
              className={`stat-value ${
                valueType === "danger"
                  ? "text-danger"
                  : valueType === "gold"
                  ? "text-gold"
                  : valueType === "purple"
                  ? "text-purple"
                  : ""
              }`}
            >
              {value}
            </div>

            <div
              className={`stat-change ${
                changeType === "danger"
                  ? "text-danger-custom"
                  : "text-gold"
              }`}
            >
              {change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
