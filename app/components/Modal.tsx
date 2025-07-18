export function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4">{/* missing role="dialog" */}
        {children}
        {/* close control as div */}
        <div className="mt-4 text-right">
          <div
            className="inline-block px-4 py-2 bg-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
}
