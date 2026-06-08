"use client";
import { useState } from "react";
import { useWizards } from "../../hooks/useWizard";
import { useDebounce } from "../../hooks/useDebounce";
import { Wizard } from "../../types/types";
import WizardDetailModal from "./WizardDetailModal";
import { Pagination } from "./Pagination";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PAGE_SIZE = 10;

function SkeletonRow() {
  return (
    <tr>
      {[40, 28, 16, 12].map((w, i) => (
        <td key={i} style={{ padding: "12px 16px" }}>
          <div
            className="skeleton"
            style={{ height: "14px", width: `${w}%` }}
          />
        </td>
      ))}
    </tr>
  );
}

export default function WizardTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedWizard, setSelectedWizard] = useState<Wizard | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const { data: wizards, isLoading, isError } = useWizards(debouncedSearch);

  const totalPages = Math.max(1, Math.ceil((wizards?.length ?? 0) / PAGE_SIZE));
  const paginated = (wizards ?? []).slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <>
      <WizardDetailModal
        wizard={selectedWizard}
        onClose={() => setSelectedWizard(null)}
      />

      <div className="table-card">
        {/* Header */}
        <div className="table-header">
          <div>
            <span className="table-title">Master Wizard Registry</span>
            <p className="table-subtitle">
              {wizards
                ? `${wizards.length} wizard${wizards.length !== 1 ? "s" : ""} found`
                : "Loading..."}
            </p>
          </div>

          <div className="table-controls">
            <div className="table-search">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  position: "absolute",
                  left: "11px",
                  top: "45%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                  fontSize: "12px",
                }}
              />
              <input
                type="text"
                placeholder="Search wizards..."
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--text-secondary)")
                }
                onBlur={(e) => (e.target.style.borderColor = "")}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <FontAwesomeIcon icon={faSliders} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="wizard-table">
            <thead>
              <tr>
                {[
                  "ID",
                  "Name",
                  "First Name",
                  "Last Name",
                  "Elixirs",
                  "Actions",
                ].map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="table-empty">
                    <span className="table-empty-icon">⚠</span>
                    Failed to load wizards. Check your connection.
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{ padding: "48px 16px", textAlign: "center" }}
                  >
                    <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                      🔮
                    </div>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      No wizards found
                    </p>
                    <span className="table-empty-sub">
                      {debouncedSearch
                        ? `No results for "${debouncedSearch}"`
                        : "The registry appears to be empty"}
                    </span>
                  </td>
                </tr>
              ) : (
                paginated.map((wizard, idx) => (
                  <tr
                    key={wizard.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${idx * 30}ms` }}
                    onClick={() => setSelectedWizard(wizard)}
                  >
                    <td>{`${wizard.id.slice(0, 8)}-...-${wizard.id.slice(-6)}`}</td>

                    <td>
                      {wizard.firstName || wizard.lastName
                        ? `${wizard.firstName ?? ""} ${wizard.lastName ?? ""}`.trim()
                        : "—"}
                    </td>

                    <td>{wizard.firstName ?? "—"}</td>
                    <td>{wizard.lastName ?? "—"}</td>

                    <td>
                      <div className="elixir-cell">
                        <span
                          className={`elixir-count ${wizard.elixirs.length > 0 ? "has-elixirs" : ""}`}
                        >
                          {wizard.elixirs.length}
                        </span>
                        {wizard.elixirs.slice(0, 2).map((e) => (
                          <span key={e.id} className="elixir-tag">
                            {e.name}
                          </span>
                        ))}
                        {wizard.elixirs.length > 2 && (
                          <span className="elixir-more">
                            +{wizard.elixirs.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <button
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWizard(wizard);
                        }}
                        aria-label={`View ${wizard.firstName} ${wizard.lastName}`}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={wizards?.length ?? 0}
          pageSize={PAGE_SIZE}
          onChange={setPage}
        />
      </div>
    </>
  );
}
