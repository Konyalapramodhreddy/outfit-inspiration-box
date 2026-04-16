import { useStore } from "@/store/StoreContext";
import Modal from "./Modal";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  onBuyNow: () => void;
}

export default function CartModal({ open, onClose, onBuyNow }: CartModalProps) {
  const { cart, removeFromCart } = useStore();
  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <Modal open={open} onClose={onClose} title="Your Cart">
      <div className="border-t border-border mt-4">
        {cart.length === 0 ? (
          <p className="py-5 text-muted-foreground">Your cart is empty.</p>
        ) : (
          cart.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-border">
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded" />
                <div>
                  <div className="text-sm font-bold">{item.name}</div>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground border border-border">{item.selectedColor}</span>
                  <div className="text-primary text-sm mt-1">₹{item.price.toLocaleString("en-IN")}</div>
                </div>
              </div>
              <button onClick={() => removeFromCart(i)} className="text-destructive text-xs font-bold hover:underline">Remove</button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="mt-5 text-right">
          <h3 className="text-primary font-bold text-lg mb-4">Total: ₹{total.toLocaleString("en-IN")}</h3>
          <button className="cta-btn w-full" onClick={onBuyNow}>Buy Now</button>
        </div>
      )}
    </Modal>
  );
}
