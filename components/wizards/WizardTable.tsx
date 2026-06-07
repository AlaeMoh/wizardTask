
"use client"
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import WizardDetailModal from "./WizardDetailModal";



const wizards = [
  {
    id: "WR-1897-MS",
    firstName: "Mrs",
    lastName: "Skower",
    status: "Active",
    specialty: "Domestic Alchemy & Cleaning Charms",
    badges: [
      { label: "Class A Citizen", type: "muted" },
      { label: "High Council",    type: "gold"  },
    ],
    elixirs: [
      { name: "Mrs Skower's All-Purpose Magical Mess Remover", inventory: "142 Units" },
      { name: "Scouring Solution Grade IV",                    inventory: "12 Units"  },
    ],
    clan: "Mrs Skower's All-Purpose Magical Mess Remover",
    clanType: "gold",
  },
  {
    id: "f47ac10b...Verfel",
    firstName: "Severus",
    lastName: "Snape",
    clan: "Vol'demort",
    clanType: "danger",
    status: "Voldemort Proxy",
    statusType: "purple",
    specialty: "Potions Master & Dark Arts Countermeasures",
    badges: [
      { label: "Order of Merlin", type: "gold" },
      { label: "Double Agent",    type: "purple" },
    ],
    elixirs: [
      { name: "Veritaserum",        inventory: "5 Units" },
      { name: "Polyjuice Potion",   inventory: "23 Units" },
    ],
  },
  {
    id: "W0c4917...703f8a",
    firstName: "Nicolas",
    lastName: "Flamel",
    clan: "Elixir of Life",
    clanType: "success",
    status: null,
    specialty: "Advanced Alchemy & Transmutation",
    badges: [
      { label: "Grand Alchemist", type: "success" },
      { label: "Centenarian",     type: "muted" },
    ],
    elixirs: [
      { name: "Elixir of Life",             inventory: "1 Unit" },
      { name: "Philosopher's Stone Extract", inventory: "3 Units" },
    ],
  },
  {
    id: "@209322...Fide12",
    firstName: "Luna",
    lastName: "Lovegood",
    clan: "New registrant",
    clanType: "muted",
    status: null,
    specialty: "Magizoology & Cryptozoological Fieldwork",
    badges: [
      { label: "Dumbledore's Army", type: "danger" },
      { label: "Quibbler Columnist", type: "muted" },
    ],
    elixirs: [
      { name: "Dirigible Plum Essence",   inventory: "45 Units" },
      { name: "Gurdyroot Infusion",       inventory: "18 Units" },
    ],
  },
];


const badgeClass: Record<string, string> = {
  gold:    "badge-gold",
  danger:  "badge-danger",
  success: "badge-success",
  purple:  "badge-purple",
  muted:   "badge-muted",
};

export default function WizardTable() {

      const [selected, setSelected] = useState(null);

  return (
    <div className="table-card">
      {/* Header */}
      <div className="table-header">
        <span className="table-title">Master Wizard Registry</span>
        <div className="table-controls">
          <div className="table-search">
            <i className="fas fa-search table-search-icon"></i>
            <input type="text" placeholder="Search wizards..." />
          </div>
          <button className="filter-btn">
        <FontAwesomeIcon icon={faSliders} />
          </button>
        </div>
      </div>

      {/* Table / Cards */}
      <div className="table-wrapper">
        <table className="wizard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Associated Clans</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wizards.map((w) => (
              <tr key={w.id}>
                <td><span className="wizard-id">{w.id}</span></td>
                <td><span className="wizard-name">{w.firstName}</span></td>
                <td><span className="wizard-name">{w.lastName}</span></td>

                <td>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    <span className={`badge ${badgeClass[w.clanType]}`}>{w.clan}</span>
                    {w.status && (
                      <span className={`badge ${badgeClass[w.statusType ?? "muted"]}`}>
                        {w.status}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <button className="action-btn" onClick={() => setSelected(w)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {wizards.map((w) => (
          <div key={w.id} className="wizard-mobile-card">
            <div className="card-header">
              <div>
                <div className="card-name">{w.firstName} {w.lastName}</div>
                <div className="card-id">{w.id}</div>
              </div>
              <button className="action-btn" onClick={() => setSelected(w)}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
            <div className="card-body">
              <div className="card-row">
                <span className="card-label">Clan</span>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  <span className={`badge ${badgeClass[w.clanType]}`}>{w.clan}</span>
                  {w.status && (
                    <span className={`badge ${badgeClass[w.statusType ?? "muted"]}`}>
                      {w.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <WizardDetailModal wizard={selected} onClose={() => setSelected(null)} />

      {/* Pagination */}
      <div className="pagination-row">
        <span className="pagination-info">Showing 1–4 of 1,248 records</span>
        <div className="pagination-btns">
          <button className="page-btn"><i className="fas fa-chevron-left"></i></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn"><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  );
}
