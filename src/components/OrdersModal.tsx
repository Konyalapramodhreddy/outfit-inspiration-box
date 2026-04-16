import { useStore } from "@/store/StoreContext";
import Modal from "./Modal";

interface OrdersModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrdersModal({ open, onClose }: OrdersModalProps) {
  const { orders } = useStore();

  return (
    <Modal open={open} onClose={onClose} title="My Orders">
      <div className="border-t border-border mt-4">
        {orders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground text-lg mb-2">No orders placed</p>
            <p className="text-muted-foreground text-sm">Your order history will appear here once you make a purchase. Go shop! 🛍️</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="flex justify-between items-start mb-3 pb-3 border-b border-border">
                <div>
                  <div className="font-bold mb-1">Order #{order.id}</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase">{order.date} · {order.payment}</div>
                </div>
                <div className="order-status-badge">{order.status}</div>
              </div>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-1.5 border-b border-background text-muted-foreground">
                  <span>{item.name} <span className="text-xs ml-2">({item.selectedColor})</span></span>
                  <span>₹{item.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="flex justify-between mt-3 pt-3 border-t border-border font-bold text-primary">
                <span>Total</span>
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
              {order.address && (
                <div className="text-xs text-muted-foreground mt-2 p-2 bg-background border-l-2 border-border">
                  📍 {order.address.name}, {order.address.line1}, {order.address.city}, {order.address.state} – {order.address.pin}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
