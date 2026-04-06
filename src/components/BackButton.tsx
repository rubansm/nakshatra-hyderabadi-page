import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 pt-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-sm text-foreground text-sm font-body hover:bg-card transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;
