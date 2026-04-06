import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";

interface Product {
  name: string;
  description: string;
  price: string;
  priceNum?: number;
}

const nonVegPickles: Product[] = [
  { name: "Chicken Pickle", description: "The OG. Slow-cooked in groundnut oil with sun-dried spices. Bold, fiery, unforgettable.", price: "₹250", priceNum: 250 },
  { name: "Boneless Chicken Pickle", description: "All the heat, zero hassle. Tender chunks drenched in spice. Pure indulgence.", price: "₹300", priceNum: 300 },
  { name: "Gongura Chicken Pickle", description: "Tangy gongura meets fiery chicken. A Telugu classic, done right.", price: "₹300", priceNum: 300 },
  { name: "Prawns Pickle", description: "Coastal heat meets Hyderabadi masala. Rich, tangy, deeply satisfying.", price: "₹400", priceNum: 400 },
  { name: "Gongura Prawns Pickle", description: "Sour gongura, succulent prawns. A flavour bomb from the coast.", price: "₹400", priceNum: 400 },
  { name: "Mutton Pickle", description: "Slow-cooked mutton, roasted spices. Deep, smoky, no shortcuts.", price: "₹400", priceNum: 400 },
  { name: "Boneless Mutton Pickle", description: "Rich, tender, boneless. Every bite is pure masala-soaked perfection.", price: "₹450", priceNum: 450 },
  { name: "Gongura Mutton Pickle", description: "Tangy gongura, tender mutton. A bold, sour-spicy masterpiece.", price: "₹450", priceNum: 450 },
  { name: "Menthikura Mutton Pickle", description: "Fenugreek-infused mutton. Earthy, aromatic, deeply comforting.", price: "₹450", priceNum: 450 },
  { name: "Fish Pickle", description: "Crispy-fried fish, soaked in masala. Tangy, crunchy, addictive.", price: "₹350", priceNum: 350 },
  { name: "Korrameenu Pickle", description: "The king of river fish. Meaty, spicy, unapologetically bold.", price: "₹400", priceNum: 400 },
  { name: "Boiled Egg Pickle", description: "Whole eggs, fiery masala. Simple, satisfying, packed with flavour.", price: "Price on request" },
];

const vegPickles: Product[] = [
  { name: "Mango Pickle", description: "Raw mango, aged to perfection. Sharp, tangy, pure nostalgia.", price: "₹100", priceNum: 100 },
  { name: "Tomato Pickle", description: "Sun-ripened tomatoes, slow-cooked. Sweet heat in every spoonful.", price: "₹100", priceNum: 100 },
  { name: "Gongura Pickle", description: "Sour, spicy, unmistakably Telugu. The green leaf that rules the plate.", price: "₹100", priceNum: 100 },
  { name: "Amla Pickle", description: "Indian gooseberry, tangy and sharp. Immunity with every bite.", price: "₹100", priceNum: 100 },
  { name: "Lemon Pickle", description: "Zesty, sour, sun-kissed lemons. The everyday essential.", price: "₹100", priceNum: 100 },
  { name: "Pandu Mirchi Pickle", description: "Red chillies, roasted and raw. Fiery, smoky, not for the faint.", price: "₹100", priceNum: 100 },
  { name: "Garlic Pickle", description: "Pungent, bold, unapologetic. Whole cloves in a spicy, oily bath.", price: "₹100", priceNum: 100 },
  { name: "Tamarind Pickle", description: "Sweet, sour, sticky goodness. A South Indian staple, perfected.", price: "₹100", priceNum: 100 },
  { name: "Coriander Pickle", description: "Fresh, herby, green. A bright, zesty hit of pure flavour.", price: "₹100", priceNum: 100 },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const whatsappLink = `https://wa.me/919010291295?text=${encodeURIComponent(
    `Hi, Nakshatra foods, May I have your time !!! I'd like to order ${quantity}x ${product.name} (${product.price} each)`
  )}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex flex-col">
      <div className="w-full aspect-[4/3] rounded-xl bg-muted flex items-center justify-center mb-3">
        <span className="font-body text-muted-foreground text-xs uppercase tracking-widest">Product Image</span>
      </div>
      <h3 className="font-navbar text-base font-bold text-foreground">{product.name}</h3>
      <p className="font-body text-muted-foreground text-xs mt-1 leading-relaxed flex-1">{product.description}</p>
      <p className="font-navbar text-lg font-bold mt-2" style={{ color: "#FF8900" }}>{product.price}</p>
      
      {product.priceNum && (
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
      )}
    </div>
  );
};

const Pickles = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container mx-auto px-4 pt-4 pb-16">
        {/* Non-Veg */}
        <h1 className="font-navbar text-2xl md:text-3xl font-bold text-foreground text-center mb-2">Our Pickles</h1>
        <p className="font-body text-muted-foreground text-center text-sm mb-8">Handmade in Hyderabad. No preservatives. Pure groundnut oil.</p>

        <h2 className="font-navbar text-lg font-bold text-foreground mb-4 uppercase tracking-widest text-center">Non-Veg Pickles <span className="font-body text-xs text-muted-foreground tracking-normal normal-case">(250g)</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {nonVegPickles.map(p => <ProductCard key={p.name} product={p} />)}
        </div>

        <h2 className="font-navbar text-lg font-bold text-foreground mb-4 uppercase tracking-widest text-center">Veg Pickles <span className="font-body text-xs text-muted-foreground tracking-normal normal-case">(250g)</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vegPickles.map(p => <ProductCard key={p.name} product={p} />)}
        </div>
      </div>
    </div>
  );
};

export default Pickles;
