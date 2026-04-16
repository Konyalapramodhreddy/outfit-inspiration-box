import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem extends Product {
  selectedColor: string;
}

export interface OrderAddress {
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
  type: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  address: OrderAddress | null;
  payment: string;
  status: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  savedAddress: OrderAddress | null;
  toast: string | null;
  addToCart: (product: Product, color?: string) => void;
  removeFromCart: (index: number) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
  placeOrder: (paymentMethod: string) => void;
  setSavedAddress: (addr: OrderAddress) => void;
  showToast: (msg: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [savedAddress, setSavedAddress] = useState<OrderAddress | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback((product: Product, color?: string) => {
    setCart(prev => [...prev, { ...product, selectedColor: color || "Jet Black" }]);
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const removeFromCart = useCallback((index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast("Item removed from cart");
  }, [showToast]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(w => w.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`);
        return prev.filter(w => w.id !== product.id);
      }
      showToast(`${product.name} wishlisted ♥`);
      return [...prev, product];
    });
  }, [showToast]);

  const isWishlisted = useCallback((id: number) => wishlist.some(w => w.id === id), [wishlist]);

  const placeOrder = useCallback((paymentMethod: string) => {
    const total = cart.reduce((s, p) => s + p.price, 0);
    const orderId = 'SI-' + Date.now().toString().slice(-6);
    const order: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      total,
      address: savedAddress,
      payment: paymentMethod,
      status: 'Confirmed · Estimated delivery in 4-6 days',
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    showToast(`Order #${orderId} placed! 🎉`);
  }, [cart, savedAddress, showToast]);

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <StoreContext.Provider value={{ cart, wishlist, orders, savedAddress, toast, addToCart, removeFromCart, toggleWishlist, isWishlisted, placeOrder, setSavedAddress, showToast, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
