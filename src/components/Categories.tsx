interface CategoriesProps {
  onFilterCategory: (cat: string) => void;
}

const cats = [
  { key: "men", label: "Men's Edit", img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop" },
  { key: "women", label: "Women's Edit", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
  { key: "kids", label: "Kids Hype", img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop" },
];

export default function Categories({ onFilterCategory }: CategoriesProps) {
  return (
    <section className="py-20 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cats.map(cat => (
          <div key={cat.key} onClick={() => onFilterCategory(cat.key)} className="h-[300px] relative overflow-hidden border border-border cursor-pointer group">
            <img src={cat.img} alt={cat.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" loading="lazy" />
            <h3 className="absolute bottom-5 left-5 text-3xl font-black uppercase pointer-events-none" style={{ textShadow: "2px 2px 0 #000" }}>{cat.label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
