import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Package, ArrowUp } from "lucide-react";
import { useStore } from "@/store/StoreContext";

interface NavbarProps {
  onFilterCategory: (cat: string) => void;
  onOpenModal: (modal: string) => void;
  onScrollToProducts: () => void;
}

export default function Navbar({ onFilterCategory, onOpenModal, onScrollToProducts }: NavbarProps) {
  const { cart, wishlist, orders } = useStore();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-[5%] py-5" style={{ background: "rgba(5,5,5,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="text-xl font-black uppercase cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Sneak In.</div>
        <div className="hidden md:flex gap-8 items-center">
          {["men", "women", "kids"].map(cat => (
            <button key={cat} onClick={() => { onFilterCategory(cat); onScrollToProducts(); }} className="text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors">{cat}</button>
          ))}
          <button onClick={() => onOpenModal("contact")} className="text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors">Contact</button>
          <button onClick={() => onOpenModal("orders")} className="text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-1">
            <Package size={14} /> My Orders
            {orders.length > 0 && <span className="bg-primary text-primary-foreground text-[0.7rem] px-1.5 rounded-full font-black">{orders.length}</span>}
          </button>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => onOpenModal("wishlist")} className="flex items-center gap-1 text-sm font-bold hover:text-destructive transition-colors">
            <Heart size={16} /> <span>({wishlist.length})</span>
          </button>
          <button onClick={() => onOpenModal("cart")} className="flex items-center gap-2 text-sm font-bold border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors">
            <ShoppingBag size={14} /> CART ({cart.length})
          </button>
        </div>
      </nav>

      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform">
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
