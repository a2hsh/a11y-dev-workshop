import { useState } from "react";
import Modal from "./Modal";
import type { Article } from "../App";

export default function AddNewsModal({
  onAdd,
  onClose,
}: {
  onAdd: (a: Article) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <h2>Add News</h2>
        {/* fields lack labels */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={`border p-2 w-full ${error ? "border-red-500" : ""}`}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          className={`border p-2 w-full ${error ? "border-red-500" : ""}`}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className={`border p-2 w-full ${error ? "border-red-500" : ""}`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="bg-blue-600 text-white px-4 py-2"
          onClick={() => {
            if (!title || !image || !content) {
              setError("Required");
              return;
            }
            onAdd({ id: Date.now(), title, image, content });
            setTitle("");
            setImage("");
            setContent("");
            onClose();
          }}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}
