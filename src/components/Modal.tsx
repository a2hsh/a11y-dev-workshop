import type { ReactNode } from "react";

export default function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4">{/* missing role="dialog" */}
        {children}
        {/* clickable div for closing */}
        <div className="mt-4 text-right">
          <div className="inline-block px-4 py-2 bg-gray-300 cursor-pointer" onClick={onClose}>
            Close
          </div>
        </div>
      </div>
    </div>
  );
}
