import ingredientsHero from "@/assets/ingredients-hero.png";

const ProductTruth = () => {
  return (
    <section className="relative">
      <div className="relative">
        <img
          src={ingredientsHero}
          alt="Nakshatra Pickle ingredients — boneless chicken, cold-pressed sesame oil, turmeric, red chili, ginger-garlic paste, mustard seeds, fenugreek, curry leaves, and mixed spices"
          className="w-full h-auto block"
        />
        {/* Text overlaid on top of the image */}
        <div className="absolute top-0 left-0 right-0 pt-8 md:pt-14 px-4 text-center z-10">
          <p className="font-body text-turmeric uppercase tracking-[0.25em] text-xs md:text-sm mb-2">
            What Goes In
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            Ingredients That Defy Distance
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ProductTruth;
