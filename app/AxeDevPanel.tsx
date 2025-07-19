

/* global HTMLDivElement, HTMLElement */

import React, { useEffect, useState, useRef } from "react";
import type { Result, NodeResult } from "axe-core";
import { useLocation } from "react-router";


export function AxeDevPanel() {
  const [violations, setViolations] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Re-run axe-core on every route change
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || typeof window === "undefined") return;
    import("axe-core").then(axe => {
      axe.default.run(document, {}, (err, results) => {
        if (err) return;
        setViolations(results.violations as Result[]);
      });
    });
  }, [location]);

  // Trap focus in modal

  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
  }, [open]);


  // Show toggle button if there are violations
  return (
    <>
      {violations.length > 0 && (
        <button
          aria-label={`Show accessibility violations (${violations.length})`}
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 9999,
            background: "#b71c1c", color: "#fff", border: "none", borderRadius: 24, padding: "12px 24px", fontWeight: 600, fontSize: 16, boxShadow: "0 2px 8px #0003", cursor: "pointer"
          }}
          onClick={() => setOpen(true)}
          hidden={open}
        >
          {violations.length === 1
            ? "Show 1 Accessibility Issue"
            : `Show ${violations.length} Accessibility Issues`}
        </button>
      )}
      {open && violations.length > 0 && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="axe-modal-title"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#fff", color: "#222", borderRadius: 8, minWidth: 320, maxWidth: 600, maxHeight: "80vh", overflow: "auto", boxShadow: "0 4px 32px #0003", padding: 24, position: "relative"
            }}
          >
            <button
              aria-label="Close accessibility violations panel"
              onClick={() => setOpen(false)}
              onKeyDown={e => { if (e.key === "Escape") setOpen(false); }}
              style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", fontSize: 24, cursor: "pointer" }}
            >
              ×
            </button>
            <h2 id="axe-modal-title" style={{ marginTop: 0, color: "#b71c1c" }}>
              Accessibility Violations ({violations.length})
            </h2>
            <div role="list" aria-label="Accessibility Violations">
              {violations.map(v => (
                <div key={v.id} style={{ marginBottom: 16, border: "1px solid #eee", borderRadius: 6, boxShadow: expanded === v.id ? "0 2px 8px #b71c1c33" : undefined }}>
                  <button
                    aria-expanded={expanded === v.id}
                    aria-controls={`panel-${v.id}`}
                    id={`accordion-${v.id}`}
                    onClick={() => setExpanded(expanded === v.id ? null : v.id)}
                    style={{
                      width: "100%", textAlign: "left", background: expanded === v.id ? "#fbe9e7" : "#fafafa", border: "none", borderRadius: 6, padding: "12px 16px", fontWeight: 600, fontSize: 16, color: "#b71c1c", cursor: "pointer", outline: expanded === v.id ? "2px solid #b71c1c" : undefined
                    }}
                  >
                    {v.id}: {v.help}
                  </button>
                  {expanded === v.id && (
                    <div
                      id={`panel-${v.id}`}
                      role="region"
                      aria-labelledby={`accordion-${v.id}`}
                      style={{ padding: "12px 16px", background: "#fff3e0" }}
                    >
                      <div style={{ marginBottom: 8 }}>{v.description}</div>
                      <div style={{ fontSize: 14, color: "#444" }}>
                        <strong>Impact:</strong> {v.impact || "unknown"}
                      </div>
                      <ul style={{ margin: "8px 0 0 0", padding: 0, listStyle: "none" }}>
                        {v.nodes.map((n: NodeResult, i: number) => (
                          <li key={i} style={{ marginBottom: 8 }}>
                            <code style={{ background: "#eee", padding: "2px 4px", borderRadius: 4 }}>{n.target.join(", ")}</code>
                            {n.failureSummary && <div style={{ fontSize: 13, color: "#b71c1c" }}>{n.failureSummary}</div>}
                          </li>
                        ))}
                      </ul>
                      {v.helpUrl && (
                        <a href={v.helpUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2", fontSize: 14 }} aria-label={`Learn more about ${v.help}`}>
                          Learn more
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
