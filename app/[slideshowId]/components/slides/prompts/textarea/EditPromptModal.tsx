import Modal from "@ism/app/components/common/modal/Modal";
import { useState } from "react";

import "./styles/editPromptModal.css";

type Props = {
  open: boolean;
  defaultValue: string | number | readonly string[] | undefined;
  action: ((formData: FormData) => Promise<void>) | undefined;
  onClose: () => void;
};

export default function EditPromptModal({
  open,
  defaultValue,
  action,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState(defaultValue);

  return (
    <Modal
      id="edit_prompt"
      className="edit_prompt__modal"
      open={open}
      close={{ noClose: true }}
    >
      <div className="edit_prompt__modal-content">
        <textarea
          defaultValue={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="edit_prompt__modal-buttons">
          <button
            className="primary_button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            Cerrar
          </button>
          <button
            className="primary_button"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const formData = new FormData();
              formData.append("alt", String(prompt));
              await action?.(formData);
              setLoading(false);
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
}
