import { useState } from "react";
import { X, Heart } from "lucide-react";
import { renderStars, getColours, getFabricTags, genCode, getReviews, SIZE_MAP, type Product } from "@/data/products";
import { products } from "@/data/products";
import { useStore } from "@/store/StoreContext";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenOther: (p: Product) => void;
}

export default function ProductDetailModal({ product, onClose, onOpenOther }: ProductDetailModalProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [mainImg, setMainImg] = useState("");
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeSize, setActiveSize] = useState(1);
  const [activeColour, setActiveColour] = useState(0);

  if (!product) return null;

  const colours = getColours(product.id);
  const sizes = SIZE_MAP[product.category] || SIZE_MAP.men;
  const tags = getFabricTags(product.id, product.category);
  const reviews = getReviews(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const currentImg = mainImg || product.gallery[0];
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box pd-modal-box" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-5 z-10 text-muted-foreground hover:text-foreground">
          <X size={24} />
        </button>
        <div className="pd-inner">
          <div className="pd-left">
            <img src={currentImg} alt={product.name} className="pd-main-img" />
            <div className="pd-thumb-row">
              {product.gallery.map((src, i) => (
                <img key={i} src={src} className={`pd-thumb ${i === activeThumb ? "active" : ""}`} loading="lazy" onClick={() => { setMainImg(src); setActiveThumb(i); }} />
              ))}
            </div>
          </div>
          <div className="pd-right">
            <div className="text-[0.7rem] font-bold tracking-[3px] uppercase text-muted-foreground">{product.category.toUpperCase()} · SNEAK IN</div>
            <h2 className="text-xl font-black uppercase leading-tight">{product.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-primary">{renderStars(product.rating)}</span>
              <span className="text-xs text-muted-foreground">{product.rating} · {product.rCount.toLocaleString("en-IN")} reviews</span>
            </div>
            <div className="text-2xl font-mono font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{genCode(product.id, product.category)}</div>

            <div className="text-[0.7rem] font-bold tracking-[2px] uppercase text-muted-foreground mt-2">Select Size</div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s, i) => (
                <button key={s} className={`size-btn ${i === activeSize ? "active" : ""}`} onClick={() => setActiveSize(i)}>{s}</button>
              ))}
            </div>

            <div className="text-[0.7rem] font-bold tracking-[2px] uppercase text-muted-foreground mt-2">Select Colour</div>
            <div className="flex flex-wrap gap-2.5 items-center">
              {colours.map((c, i) => (
                <div key={c.label} className={`colour-dot ${i === activeColour ? "active" : ""}`} style={{ background: c.c }} title={c.label} onClick={() => setActiveColour(i)} />
              ))}
              <span className="text-xs text-muted-foreground ml-1">{colours[activeColour].label}</span>
            </div>

            <div className="text-[0.7rem] font-bold tracking-[2px] uppercase text-muted-foreground mt-2">Fabric & Care</div>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => <span key={t} className="pd-tag">{t}</span>)}
            </div>

            <div className="text-[0.7rem] font-bold tracking-[2px] uppercase text-muted-foreground mt-2">Customer Reviews</div>
            <div>
              {reviews.map((r, i) => (
                <div key={i} className="py-3 border-b border-border">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-muted-foreground">{r.u}</span>
                    <span className="text-primary text-sm">{renderStars(r.r)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{r.t}</div>
                </div>
              ))}
            </div>

            <div className="text-[0.7rem] font-bold tracking-[2px] uppercase text-muted-foreground mt-2">You May Also Like</div>
            <div className="flex flex-wrap gap-2">
              {related.map(p => (
                <button key={p.id} className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors" onClick={() => { onOpenOther(p); }}>
                  {p.name}
                </button>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-4">
              <button className="add-btn !py-3.5 !text-sm" onClick={() => { addToCart(product, colours[activeColour].label); onClose(); }}>Add to Cart</button>
              <button className="add-btn !py-3.5 !text-sm !bg-popover !text-foreground !border !border-border" onClick={() => toggleWishlist(product)}>
                <Heart size={14} className="inline mr-2" fill={wishlisted ? "currentColor" : "none"} />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
