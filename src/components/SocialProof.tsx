import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredReviews } from "@/data/reviews";

const SocialProof = () => {
  return (
    <section className="bg-background py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-1 mb-3">
          <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <p className="font-body text-turmeric uppercase tracking-[0.2em] text-sm text-center">
            Straight from Google Reviews
          </p>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          Real People. Real Taste. Real Reviews.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {featuredReviews.map((review, i) => (
            <div
              key={i}
              className="bg-card rounded-md p-6 border border-border"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-turmeric text-turmeric"
                  />
                ))}
              </div>
              <p className="font-body text-muted-foreground mb-4 leading-relaxed text-sm">
                "{review.text}"
              </p>
              <div>
                <p className="font-body font-semibold text-foreground text-sm">
                  {review.name}
                </p>
                {review.isLocalGuide && (
                  <p className="font-body text-turmeric text-xs">Local Guide</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/reviews"
            className="font-body text-sm text-turmeric hover:text-turmeric/80 underline underline-offset-4 transition-colors"
          >
            See all 29 reviews →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
