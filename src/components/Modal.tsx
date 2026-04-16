import { type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
  noPadding?: boolean;
}

export default function Modal({ open, onClose, title, children, wide, noPadding }: ModalProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-box ${wide ? "pd-modal-box" : ""} ${noPadding ? "!p-0 overflow-hidden" : ""}`} onClick={e => e.stopPropagation()}>
        {!noPadding && (
          <button onClick={onClose} className="absolute top-5 right-6 text-muted-foreground hover:text-foreground z-10">
            <X size={24} />
          </button>
        )}
        {!noPadding && <h2 className="text-xl font-black uppercase mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
