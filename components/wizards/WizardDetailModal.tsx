"use client";
import { Wizard } from "../../types/types";
import { useEffect } from "react";
import { faFlask, faPen, faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";


interface WizardDetailModalProps {
  wizard: Wizard | null;
  onClose: () => void;
}



export default function WizardDetailModal({ wizard, onClose }: WizardDetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (wizard) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [wizard, onClose]);

  if (!wizard) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />


      {/* Modal */}
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
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
         <div className="modal-body">

          {/* Avatar + Info */}
          <div className="modal-info-row ">
            <div className="modal-avatar " 
>
                        <Image
                        src="/logo2.jpg"
                        alt="Logo"
                        width={192}
                        height={192}
                        className="logo-img"
                        />
            </div>

            <div className="modal-fields">
              <div className="modal-field-grid">
                <div>
                  <p className="field-label">First Name</p>
                  <p className="field-value">{wizard?.firstName ||" unknown "}</p>
                </div>
                <div>
                  <p className="field-label">Last Name</p>
                  <p className="field-value">{wizard?.lastName ||" unknown "}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Elixirs */}
          <div className="modal-section">
            <p className="modal-section-title">
              <FontAwesomeIcon icon={faFlask} /> Associated Elixirs
            </p>
          <div className="modal-elixirs">
            {wizard.elixirs.length === 0 ? (
              <div
              >
                No elixirs recorded
              </div>
            ) : (
              wizard.elixirs.map((e) => (
                <div className="elixir-row" key={e.id}>
                  <div className="elixir-icon" style={{ color: "#fff" }}>
                    <FontAwesomeIcon icon={faSyringe} />
                  </div>

                  <div className="elixir-info">
                    <p className="elixir-name">{e.name}</p>
                    <p className="elixir-inv">
                      Inventory: {e.id}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
                {/* Footer */}
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>Close</button>
          <button className="modal-edit-btn">
            <FontAwesomeIcon icon={faPen} /> Edit Record
          </button>
        </div>
        </div>
        </div>
    </>
  );
}