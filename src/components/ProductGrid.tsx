import { useState } from "react";
import { Heart } from "lucide-react";
import { products, renderStars, type Product } from "@/data/products";
import { useStore } from "@/store/StoreContext";

interface ProductGridProps {
  filter: string;
  onOpenDetail: (product: Product) => void;
  productsRef: React.RefObject<HTMLElement | null>;
}

export default function ProductGrid({ filter, onOpenDetail, productsRef }: ProductGridProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [activeFilter, setActiveFilter] = useState(filter);

  const filtered = activeFilter === "all" ? products : products.filter(p => p.category === activeFilter);

  const handleFilter = (cat: string) => setActiveFilter(cat);

  // Sync external filter
  if (filter !== activeFilter && filter !== "") {
    // Triggered from nav
    setTimeout(() => setActiveFilter(filter), 0);
  }

  return (
    <section ref={productsRef} className="py-12 px-[5%]">
      <div className="flex justify-between items-end mb-5 border-b border-border pb-5">
        <h2 className="text-4xl font-black uppercase">Full Collection</h2>
        <span className="text-muted-foreground">[ 2026 Drop ]</span>
      </div>
      <div className="flex gap-0 mb-8 border-b border-border">
        {["all", "men", "women", "kids"].map(cat => (
          <button key={cat} onClick={() => handleFilter(cat)} className={`px-6 py-2.5 font-bold text-xs uppercase tracking-widest border-b-2 -mb-px transition-colors ${activeFilter === cat ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(product => (
          <div key={product.id} className="group">
            <div className="h-[350px] bg-secondary overflow-hidden relative mb-4 cursor-pointer" onClick={() => onOpenDetail(product)}>
              <img src={product.img} alt={product.name} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
              <button onClick={e => { e.stopPropagation(); toggleWishlist(product); }} className={`absolute top-4 right-4 p-2 rounded-full transition-transform hover:scale-110 ${isWishlisted(product.id) ? "text-destructive" : "text-foreground"}`} style={{ background: "rgba(0,0,0,0.3)" }}>
                <Heart size={18} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold uppercase mb-1">{product.name}</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary text-sm">{renderStars(product.rating)}</span>
                <span className="text-xs text-muted-foreground">{product.rating} ({product.rCount.toLocaleString("en-IN")})</span>
              </div>
              <span className="text-primary font-mono text-sm block mb-2">₹{product.price.toLocaleString("en-IN")}</span>
              <button onClick={() => addToCart(product)} className="add-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
