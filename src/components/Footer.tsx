interface FooterProps {
  onFilterCategory: (cat: string) => void;
  onScrollToProducts: () => void;
  onOpenModal: (modal: string) => void;
}

export default function Footer({ onFilterCategory, onScrollToProducts, onOpenModal }: FooterProps) {
  return (
    <footer className="px-[5%] pt-16 border-t border-border mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="text-2xl font-black uppercase">Sneak In.</div>
          <p className="text-muted-foreground text-xs mt-2 leading-relaxed">Premium streetwear from Hyderabad.<br />Dropping heat every season.</p>
        </div>
        <div>
          <h4 className="text-xs tracking-[3px] uppercase text-muted-foreground mb-4 font-bold">Shop</h4>
          <div className="flex flex-col gap-2.5">
            {["men", "women", "kids"].map(cat => (
              <button key={cat} onClick={() => { onFilterCategory(cat); onScrollToProducts(); }} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors capitalize">{cat}'s Collection</button>
            ))}
            <button onClick={onScrollToProducts} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors">Full Collection</button>
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-[3px] uppercase text-muted-foreground mb-4 font-bold">Help</h4>
          <div className="flex flex-col gap-2.5">
            <button onClick={() => onOpenModal("contact")} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</button>
            <button onClick={() => onOpenModal("orders")} className="text-left text-sm text-muted-foreground hover:text-primary transition-colors">Track My Order</button>
            <span className="text-sm text-muted-foreground">Returns Policy</span>
            <span className="text-sm text-muted-foreground">Shipping Info</span>
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-[3px] uppercase text-muted-foreground mb-4 font-bold">Connect</h4>
          <div className="flex flex-col gap-2.5">
            {["Instagram", "Twitter", "Facebook", "YouTube"].map(s => (
              <a key={s} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 flex flex-wrap justify-between items-center text-xs uppercase tracking-wider text-muted-foreground gap-3">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-primary transition-colors">↑ Back to Top</button>
        <span>© 2026 Sneak In. All Rights Reserved.</span>
        <button onClick={() => onOpenModal("contact")} className="hover:text-primary transition-colors">Privacy Policy</button>
      </div>
    </footer>
  );
}
