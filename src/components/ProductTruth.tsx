const ProductTruth = () => {
  return (
    <section className="relative">
      <div className="relative">
        <img
          src="https://pub-f43385626ccb4562b4a9240e54322e61.r2.dev/Anatomy.png"
          alt="Nakshatra Pickle ingredients — boneless chicken, cold-pressed sesame oil, turmeric, red chili, ginger-garlic paste, mustard seeds, fenugreek, curry leaves, and mixed spices"
          className="w-full h-auto block"
        />
        {/* Text overlaid on top of the image */}
        <div className="absolute top-0 left-0 right-0 pt-8 md:pt-14 px-4 text-center z-10">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            The anatomy of a good pickle
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ProductTruth;
