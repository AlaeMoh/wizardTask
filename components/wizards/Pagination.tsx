import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onChange: (page: number) => void;
}

function getPageRange(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, null, total];
  if (current >= total - 3)
    return [1, null, total - 4, total - 3, total - 2, total - 1, total];

  return [1, null, current - 1, current, current + 1, null, total];
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onChange,
}: PaginationProps) {
  if (totalItems === 0) return null;

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);
  const pages = getPageRange(page, totalPages);

  return (
    <div className="pagination-root">
      <span className="pagination-meta">
        Showing {rangeStart}–{rangeEnd} of {totalItems}
      </span>

      <nav className="pagination-controls" aria-label="Pagination">
        <button
          className="pg-btn"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          ←
        </button>

        {pages.map((p, i) =>
          p === null ? (
            <span key={`gap-${i}`} className="pg-gap" aria-hidden>
              …
            </span>
          ) : (
            <button
              key={p}
              className={`pg-btn pg-num ${page === p ? "pg-active" : ""}`}
              onClick={() => onChange(p)}
              aria-label={`Page ${p}`}
              aria-current={page === p ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}

        <button
          className="pg-btn"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          →
        </button>
      </nav>
    </div>
  );
}
