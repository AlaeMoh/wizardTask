import React from 'react'
import "../../styles/styles.css"

const stats = [
  {
    label: "TOTAL REGISTERED WIZARDS",
    value: "1,248",
    change: "↑ +14% from last moon",
    changeType: "gold",
  },
  {
    label: "ACTIVE ELIXIRS",
    value: "856",
    change: "↑ 3 new formulas registered",
    changeType: "gold",
  },
  {
    label: "PENDING VERIFICATIONS",
    value: "12",
    change: "! 1 requires High Council approval",
    changeType: "danger",
  },
];


export default function StatCard() {
  return (
<div className='bgmain cards container-fluid'>
  <div className="header grey mb-4">
    <h3>Wizarding Registry Dashboard</h3>
    <p>Overseeing the mystical equilibruim accross all magical realms.</p>
  </div>

  <div className="stats-row">
    {stats.map(({ label, value, change, changeType }) => (
      <div className="stat-card grey" key={label}>
        <div className="stat-label grey">{label}</div>

        <div className="stat-value">{value}</div>

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
