import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-[70px] left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-sm text-foreground text-sm font-body hover:bg-card transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
