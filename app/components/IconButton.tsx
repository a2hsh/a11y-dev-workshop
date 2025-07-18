import type { ButtonHTMLAttributes } from "react";

export function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className="icon-btn p-2">
      {/* no accessible name */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <circle cx="10" cy="10" r="10" />
      </svg>
    </button>
  );
}
