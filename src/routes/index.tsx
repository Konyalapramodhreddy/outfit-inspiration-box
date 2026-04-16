import { useState, useRef, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { StoreProvider, useStore } from "@/store/StoreContext";
import type { Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import CartModal from "@/components/CartModal";
import WishlistModal from "@/components/WishlistModal";
import OrdersModal from "@/components/OrdersModal";
import ContactModal from "@/components/ContactModal";
import AddressModal from "@/components/AddressModal";
import PaymentModal from "@/components/PaymentModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: IndexWrapper,
  head: () => ({
    meta: [
      { title: "Sneak In | Premium Streetwear" },
      { name: "description", content: "Shop the latest in streetwear. Trending oversized hoodies, graphic tees, and urban essentials from Sneak In." },
    ],
  }),
});

function IndexWrapper() {
  return (
    <StoreProvider>
      <Index />
    </StoreProvider>
  );
}

function Index() {
  const { toast } = useStore();
  const [modal, setModal] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const productsRef = useRef<HTMLElement | null>(null);

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openModal = useCallback((m: string) => setModal(m), []);
  const closeModal = useCallback(() => setModal(null), []);

  const handleFilterCategory = useCallback((cat: string) => {
    setFilter(cat);
    setTimeout(() => scrollToProducts(), 100);
  }, [scrollToProducts]);

  const handleBuyNow = useCallback(() => {
    setModal("address");
  }, []);

  const handleAddressContinue = useCallback(() => {
    setModal("payment");
  }, []);

  const handlePaymentBack = useCallback(() => {
    setModal("address");
  }, []);

  const handleOrderPlaced = useCallback(() => {
    setModal(null);
    setTimeout(() => setModal("orders"), 600);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar onFilterCategory={handleFilterCategory} onOpenModal={openModal} onScrollToProducts={scrollToProducts} />
      <Hero onScrollToProducts={scrollToProducts} />
      <Categories onFilterCategory={handleFilterCategory} />
      <ProductGrid filter={filter} onOpenDetail={setDetailProduct} productsRef={productsRef} />
      <Footer onFilterCategory={handleFilterCategory} onScrollToProducts={scrollToProducts} onOpenModal={openModal} />

      <CartModal open={modal === "cart"} onClose={closeModal} onBuyNow={handleBuyNow} />
      <WishlistModal open={modal === "wishlist"} onClose={closeModal} />
      <OrdersModal open={modal === "orders"} onClose={closeModal} />
      <ContactModal open={modal === "contact"} onClose={closeModal} />
      <AddressModal open={modal === "address"} onClose={closeModal} onContinue={handleAddressContinue} />
      <PaymentModal open={modal === "payment"} onClose={closeModal} onBack={handlePaymentBack} onOrderPlaced={handleOrderPlaced} />
      <ProductDetailModal product={detailProduct} onClose={() => setDetailProduct(null)} onOpenOther={setDetailProduct} />

      {toast && <div className="toast-container">{toast}</div>}
    </div>
  );
}
