import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";

interface Snack {
  name: string;
  description: string;
  price: string;
  priceNum: number;
}

const snacks: Snack[] = [
  { name: "Chekkalu", description: "Crispy rice crackers, handmade the old way. Addictive with every bite.", price: "₹140", priceNum: 140 },
  { name: "Chethi Chekkalu", description: "Pressed by hand, golden and thin. The artisan version you deserve.", price: "₹140", priceNum: 140 },
  { name: "Boondi", description: "Tiny, crunchy, perfectly spiced. The snack that disappears too fast.", price: "₹140", priceNum: 140 },
  { name: "Sanna Pusa", description: "Thin, flaky, melt-in-your-mouth. A Hyderabadi teatime ritual.", price: "₹140", priceNum: 140 },
  { name: "Muruku", description: "Spiral-shaped, crispy perfection. Crunchy, savoury, impossible to stop.", price: "₹140", priceNum: 140 },
  { name: "Pappu Chekodi", description: "Lentil-crusted rings, deep-fried gold. Bold flavour, satisfying crunch.", price: "₹140", priceNum: 140 },
  { name: "Maida Tea Chips", description: "Light, flaky, mildly salted. The perfect chai companion.", price: "₹140", priceNum: 140 },
  { name: "Sakinalu", description: "Layered rice rings, oil-kissed and crispy. A festive favourite, anytime.", price: "₹140", priceNum: 140 },
  { name: "Arishelu", description: "Sweet jaggery-filled rice cakes. Golden, warm, pure tradition.", price: "₹140", priceNum: 140 },
];

const SnackCard = ({ snack }: { snack: Snack }) => {
  const [quantity, setQuantity] = useState(1);

  const whatsappLink = `https://wa.me/919010291295?text=${encodeURIComponent(
    `Hi, Nakshatra foods, May I have your time !!! I'd like to order ${quantity}x ${snack.name} (${snack.price} each)`
  )}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex flex-col">
      <div className="w-full aspect-[4/3] rounded-xl bg-muted flex items-center justify-center mb-3">
        <span className="font-body text-muted-foreground text-xs uppercase tracking-widest">Product Image</span>
      </div>
      <h3 className="font-navbar text-base font-bold text-foreground">{snack.name}</h3>
      <p className="font-body text-muted-foreground text-xs mt-1 leading-relaxed flex-1">{snack.description}</p>
      <p className="font-navbar text-lg font-bold mt-2" style={{ color: "#FF8900" }}>{snack.price}</p>
      
      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center gap-1.5 border border-border rounded-full px-2 py-1">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-6 h-6 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground">
            <Minus size={12} />
          </button>
          <span className="font-body font-semibold text-foreground w-5 text-center text-xs">{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground">
            <Plus size={12} />
          </button>
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center font-body font-semibold text-white px-4 py-2 rounded-full text-xs hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#FF8900" }}
        >
          Add to Cart
        </a>
      </div>
    </div>
  );
};

const Snacks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-4 pb-16">
        <h1 className="font-navbar text-2xl md:text-3xl font-bold text-foreground text-center mb-2">Our Snacks</h1>
        <p className="font-body text-muted-foreground text-center text-sm mb-8">Handmade, traditional, no shortcuts. Straight from Hyderabad kitchens.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {snacks.map(s => <SnackCard key={s.name} snack={s} />)}
        </div>
      </div>
    </div>
  );
};

export default Snacks;
