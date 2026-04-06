import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-md text-foreground text-sm font-body hover:bg-card transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
};

export default BackButton;
