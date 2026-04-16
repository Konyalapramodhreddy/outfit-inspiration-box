import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import { useStore } from "@/store/StoreContext";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    showToast("Feedback submitted! Thanks 🙌");
    setForm({ name: "", email: "", message: "" });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Get In Touch">
      <p className="text-muted-foreground mb-5">We'd love to hear from you.</p>
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex items-center gap-4 text-lg"><span className="text-primary w-6">✉</span> sneakin@gmail.com</div>
        <div className="flex items-center gap-4 text-lg"><span className="text-primary w-6">📞</span> +91 98765 43210</div>
        <div className="flex items-center gap-4 text-lg"><span className="text-primary w-6">📍</span> Urban District, Hyderabad</div>
      </div>
      <hr className="border-border my-5" />
      <h3 className="font-bold mb-4">Feedback Form</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="YOUR NAME" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="form-input" />
        <input type="email" placeholder="YOUR EMAIL" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="form-input" />
        <textarea placeholder="YOUR FEEDBACK / MESSAGE" rows={3} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="form-input" />
        <button type="submit" className="cta-btn w-full">Submit Feedback</button>
      </form>
    </Modal>
  );
}
