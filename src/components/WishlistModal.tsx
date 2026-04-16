import { useStore } from "@/store/StoreContext";
import Modal from "./Modal";

interface WishlistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WishlistModal({ open, onClose }: WishlistModalProps) {
  const { wishlist, addToCart } = useStore();

  return (
    <Modal open={open} onClose={onClose} title="Your Wishlist">
      <div className="border-t border-border mt-4">
        {wishlist.length === 0 ? (
          <p className="py-5 text-muted-foreground">Your wishlist is empty.</p>
        ) : (
          wishlist.map(item => (
            <div key={item.id} className="flex justify-between items-center py-4 border-b border-border">
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded" />
                <div>
                  <div className="text-sm font-bold">{item.name}</div>
                  <div className="text-primary text-sm">₹{item.price.toLocaleString("en-IN")}</div>
                </div>
              </div>
              <button onClick={() => addToCart(item)} className="add-btn !w-auto !px-4 !py-1.5 text-xs">Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
