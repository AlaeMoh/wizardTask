"use client";

import { faFlask, faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

type Elixir = {
  name: string;
  inventory: string;
};

type Wizard = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  specialty: string;
  badges: { label: string; type: string }[];
  elixirs: Elixir[];
  avatarUrl?: string;
};

type Props = {
  wizard: Wizard | null;
  onClose: () => void;
};

const badgeClass: Record<string, string> = {
  gold:   "badge-gold",
  purple: "badge-purple",
  muted:  "badge-muted",
};

export default function WizardDetailModal({ wizard, onClose }: Props) {
  if (!wizard) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="modal-card">

        {/* Header */}
        <div className="modal-header">
          <div>
            <p className="modal-label">MEMBER PROFILE</p>
            <h3 className="modal-name">
              {wizard.firstName} {wizard.lastName}
            </h3>
          </div>
          <div className="modal-id-block">
            <p className="modal-label">Registry ID</p>
            <span className="modal-id">{wizard.id}</span>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* Avatar + Info */}
          <div className="modal-info-row">
            <div className="modal-avatar">
                        <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={60}
                        height={60}
                        className="logo-img"
                        />
            </div>

            <div className="modal-fields">
              <div className="modal-field-grid">
                <div>
                  <p className="field-label">First Name</p>
                  <p className="field-value">{wizard.firstName}</p>
                </div>
                <div>
                  <p className="field-label">Last Name</p>
                  <p className="field-value">{wizard.lastName}</p>
                </div>
                <div>
                  <p className="field-label">Registry Status</p>
                  <p className="field-status gold">
                    <span className="status-dot" /> {wizard.status || "Unkown"} 
                  </p>
                </div>
                <div>
                  <p className="field-label">Primary Specialty</p>
                  <p className="field-value">{wizard.specialty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="modal-badges">
            {wizard.badges.map((b) => (
              <span key={b.label} className={`badge ${badgeClass[b.type] ?? "badge-muted"}`}>
                {b.label}
              </span>
            ))}
          </div>

          {/* Elixirs */}
          <div className="modal-section">
            <p className="modal-section-title">
              <FontAwesomeIcon icon={faFlask} /> Associated Elixirs
            </p>
            <div className="modal-elixirs">
              {wizard.elixirs.map((e) => (
                <div className="elixir-row" key={e.name}>
                  <div className="elixir-icon">
                    <FontAwesomeIcon icon={faSyringe} />
                  </div>
                  <div className="elixir-info">
                    <p className="elixir-name">{e.name}</p>
                    <p className="elixir-inv">Inventory: {e.inventory}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>Close</button>
          <button className="modal-edit-btn">
            <i className="fas fa-pen" /> Edit Record
          </button>
        </div>
      </div>
    </>
  );
}