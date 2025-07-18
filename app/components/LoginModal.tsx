import { Modal } from "./Modal";

export function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <h2>Login</h2>
        {/* inputs lack associated labels */}
        <input type="text" id="email" placeholder="Email" className="border p-2 w-full" />
        <input type="password" id="password" placeholder="Password" className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2">Submit</button>
      </div>
    </Modal>
  );
}
