import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-[90px] left-4 z-40 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 shadow-md text-foreground text-sm font-body hover:bg-white/50 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
