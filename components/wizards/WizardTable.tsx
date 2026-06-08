"use client";
import { useState, useEffect } from "react";
import { useWizards } from "../../hooks/useWizard";
import { Wizard } from "../../types/types";
import WizardDetailModal from "./WizardDetailModal";
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
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedWizard, setSelectedWizard] = useState<Wizard | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue]);

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
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                marginTop: "2px",
              }}
            >
              {wizards
                ? `${wizards.length} wizard${wizards.length !== 1 ? "s" : ""} found`
                : "Loading..."}
            </p>
          </div>

          {/* Search Input */}
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
                onChange={(e) => setInputValue(e.target.value)}
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
              <tr
                style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  background: "var(--bg-elevated)",
                }}
              >
                {[
                  "ID",
                  "Name",
                  "First Name",
                  "Last Name",
                  "Elixirs",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
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
                  <td
                    colSpan={4}
                    style={{ padding: "40px 16px", textAlign: "center" }}
                  >
                    <div
                      style={{ color: "var(--accent-rose)", fontSize: "14px" }}
                    >
                      ⚠ Failed to load wizards. Check your connection.
                    </div>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
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
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {debouncedSearch
                        ? `No results for "${debouncedSearch}"`
                        : "The registry appears to be empty"}
                    </p>
                  </td>
                </tr>
              ) : (
                paginated.map((wizard, idx) => (
                  <tr
                    key={wizard.id}
                    style={{
                      borderBottom: "1px solid var(--border-subtle)",
                      cursor: "pointer",
                      transition: "background 0.1s ease",
                      animationDelay: `${idx * 30}ms`,
                    }}
                    className="animate-fade-up"
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "var(--bg-hover)";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = "transparent";
                    }}
                    onClick={() => setSelectedWizard(wizard)}
                  >
                    <td>
                      {" "}
                      {`${wizard.id.slice(0, 8)}-...-${wizard.id.slice(-6)}`}
                    </td>

                    <td style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "var(--text-primary)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {wizard.firstName || wizard.lastName
                            ? `${wizard.firstName || ""} ${wizard.lastName || ""}`
                            : "—"}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: wizard.firstName
                          ? "var(--text-secondary)"
                          : "var(--text-muted)",
                      }}
                    >
                      {wizard.firstName ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: wizard.lastName
                          ? "var(--text-secondary)"
                          : "var(--text-muted)",
                      }}
                    >
                      {wizard.lastName ?? "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "22px",
                            height: "22px",
                            padding: "0 6px",
                            borderRadius: "6px",
                            background:
                              wizard.elixirs.length > 0
                                ? "rgba(108, 140, 255, 0.12)"
                                : "var(--bg-elevated)",
                            border: `1px solid ${wizard.elixirs.length > 0 ? "rgba(108, 140, 255, 0.25)" : "var(--border-subtle)"}`,
                            fontSize: "11px",
                            fontWeight: 600,
                            color:
                              wizard.elixirs.length > 0
                                ? "var(--accent-primary)"
                                : "var(--text-muted)",
                          }}
                        >
                          {wizard.elixirs.length}
                        </span>
                        {wizard.elixirs.slice(0, 2).map((e) => (
                          <span
                            key={e.id}
                            style={{
                              fontSize: "11px",
                              color: "var(--text-muted)",
                              background: "var(--bg-elevated)",
                              padding: "2px 7px",
                              borderRadius: "4px",
                              border: "1px solid var(--border-subtle)",
                              whiteSpace: "nowrap",
                              maxWidth: "100px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {e.name}
                          </span>
                        ))}
                        {wizard.elixirs.length > 2 && (
                          <span
                            style={{
                              fontSize: "11px",
                              color: "var(--text-muted)",
                            }}
                          >
                            +{wizard.elixirs.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => setSelectedWizard(wizard)}
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
        {!isLoading && !isError && (wizards?.length ?? 0) > 0 && (
          <div
            style={{
              padding: "14px 22px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, wizards?.length ?? 0)} of{" "}
              {wizards?.length ?? 0}
            </span>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-elevated)",
                  color:
                    page === 1 ? "var(--text-muted)" : "var(--text-secondary)",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--font-body)",
                  opacity: page === 1 ? 0.5 : 1,
                }}
              >
                ← Prev
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p = i + 1;
                if (totalPages > 5 && page > 3) {
                  p = page - 2 + i;
                  if (p > totalPages) p = totalPages - (4 - i);
                }
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      border:
                        page === p
                          ? "1px solid var(--accent-primary)"
                          : "1px solid var(--border-default)",
                      background:
                        page === p
                          ? "rgba(108, 140, 255, 0.15)"
                          : "var(--bg-elevated)",
                      color:
                        page === p
                          ? "var(--accent-primary)"
                          : "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: page === p ? 600 : 400,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-elevated)",
                  color:
                    page === totalPages
                      ? "var(--text-muted)"
                      : "var(--text-secondary)",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--font-body)",
                  opacity: page === totalPages ? 0.5 : 1,
                }}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
