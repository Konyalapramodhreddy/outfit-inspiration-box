import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import { useStore } from "@/store/StoreContext";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function AddressModal({ open, onClose, onContinue }: AddressModalProps) {
  const { cart, savedAddress, setSavedAddress } = useStore();
  const total = cart.reduce((s, p) => s + p.price, 0);

  const [form, setForm] = useState({
    name: savedAddress?.name || "",
    phone: savedAddress?.phone || "",
    line1: savedAddress?.line1 || "",
    line2: savedAddress?.line2 || "",
    city: savedAddress?.city || "",
    state: savedAddress?.state || "",
    pin: savedAddress?.pin || "",
    type: savedAddress?.type || "Home",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSavedAddress(form);
    onContinue();
  };

  const updateField = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  return (
    <Modal open={open} onClose={onClose} title="Delivery Address">
      <p className="text-muted-foreground text-sm mb-4">Please fill in your delivery details before proceeding to payment.</p>
      <div className="bg-background border border-border p-3 mb-4 text-xs text-muted-foreground">
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between py-1 border-b border-popover">
            <span>{item.name} <span className="text-muted-foreground">({item.selectedColor})</span></span>
            <span>₹{item.price.toLocaleString("en-IN")}</span>
          </div>
        ))}
        <div className="flex justify-between py-1 font-bold text-primary">
          <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="FULL NAME" required value={form.name} onChange={e => updateField("name", e.target.value)} className="form-input" />
          <input type="tel" placeholder="PHONE NUMBER" required value={form.phone} onChange={e => updateField("phone", e.target.value)} className="form-input" />
        </div>
        <input type="text" placeholder="FLAT / HOUSE NO., STREET" required value={form.line1} onChange={e => updateField("line1", e.target.value)} className="form-input" />
        <input type="text" placeholder="AREA / LOCALITY" value={form.line2} onChange={e => updateField("line2", e.target.value)} className="form-input" />
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="CITY" required value={form.city} onChange={e => updateField("city", e.target.value)} className="form-input" />
          <input type="text" placeholder="STATE" required value={form.state} onChange={e => updateField("state", e.target.value)} className="form-input" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="PINCODE" required value={form.pin} onChange={e => updateField("pin", e.target.value)} className="form-input" />
          <select value={form.type} onChange={e => updateField("type", e.target.value)} className="form-input">
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="cta-btn w-full">Continue to Payment →</button>
        <button type="button" className="back-btn" onClick={onClose}>← Back to Cart</button>
      </form>
    </Modal>
  );
}
