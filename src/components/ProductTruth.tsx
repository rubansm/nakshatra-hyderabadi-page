import ingredientsHero from "@/assets/ingredients-hero.png";

const ProductTruth = () => {
  return (
    <section className="bg-foreground">
      <div className="pt-10 md:pt-16 pb-4 md:pb-6 px-4 text-center">
        <p className="font-body text-turmeric uppercase tracking-[0.25em] text-xs md:text-sm mb-2">
          What Goes In
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-background leading-tight">
          Ingredients That Defy Distance
        </h2>
      </div>
      <img
        src={ingredientsHero}
        alt="Nakshatra Pickle ingredients — boneless chicken, cold-pressed sesame oil, turmeric, red chili, ginger-garlic paste, mustard seeds, fenugreek, curry leaves, and mixed spices"
        className="w-full h-auto block"
      />
    </section>
  );
};

export default ProductTruth;
