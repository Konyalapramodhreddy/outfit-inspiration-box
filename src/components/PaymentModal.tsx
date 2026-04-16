import { useState } from "react";
import Modal from "./Modal";
import { useStore } from "@/store/StoreContext";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  onOrderPlaced: () => void;
}

export default function PaymentModal({ open, onClose, onBack, onOrderPlaced }: PaymentModalProps) {
  const { savedAddress, placeOrder } = useStore();
  const [showCard, setShowCard] = useState(false);

  const handlePay = (method: string) => {
    placeOrder(method);
    setShowCard(false);
    onOrderPlaced();
  };

  return (
    <Modal open={open} onClose={onClose} title="Select Payment Method">
      {savedAddress && (
        <div className="delivery-box">
          <strong className="text-foreground">Delivering to: {savedAddress.name}</strong><br />
          {savedAddress.line1}{savedAddress.line2 ? `, ${savedAddress.line2}` : ""}<br />
          {savedAddress.city}, {savedAddress.state} – {savedAddress.pin}<br />
          <span className="text-muted-foreground">📞 {savedAddress.phone} · {savedAddress.type}</span>
        </div>
      )}
      <div className="flex flex-col gap-3 mt-5">
        <button className="payment-btn" onClick={() => handlePay("Cash on Delivery")}>💵 Cash on Delivery</button>
        <button className="payment-btn" onClick={() => handlePay("Google Pay")}>🟢 Google Pay</button>
        <button className="payment-btn" onClick={() => handlePay("PhonePe")}>🟣 PhonePe</button>
        <button className="payment-btn" onClick={() => handlePay("Paytm")}>🔵 Paytm</button>
        <button className="payment-btn" onClick={() => setShowCard(true)}>💳 Debit / Credit Card</button>
      </div>
      {showCard && (
        <div className="mt-5 flex flex-col gap-3">
          <input type="text" placeholder="Card Number" maxLength={19} className="form-input" />
          <input type="text" placeholder="Card Holder Name" className="form-input" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="MM/YY" maxLength={5} className="form-input" />
            <input type="text" placeholder="CVV" maxLength={3} className="form-input" />
          </div>
          <button className="cta-btn w-full" onClick={() => handlePay("Card")}>Pay Now</button>
        </div>
      )}
      <button className="back-btn mt-4" onClick={onBack}>← Back to Address</button>
    </Modal>
  );
}
