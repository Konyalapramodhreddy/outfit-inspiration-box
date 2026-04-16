interface HeroProps {
  onScrollToProducts: () => void;
}

export default function Hero({ onScrollToProducts }: HeroProps) {
  return (
    <header className="h-screen flex items-center justify-center text-center relative" style={{
      background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000&auto=format&fit=crop')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    }}>
      <div>
        <h1 className="font-black uppercase leading-[0.9] mb-5 text-transparent hover:text-foreground transition-colors duration-500" style={{ fontSize: "clamp(3rem, 10vw, 8rem)", WebkitTextStroke: "1px white" }}>
          Sneak In<br />Premium
        </h1>
        <p className="max-w-[600px] mx-auto mb-8 text-muted-foreground">Shop the latest in streetwear. Trending oversized hoodies, graphic tees, and urban essentials.</p>
        <button className="cta-btn" onClick={onScrollToProducts}>View Collection</button>
      </div>
    </header>
  );
}
