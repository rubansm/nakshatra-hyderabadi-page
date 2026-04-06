import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-[90px] left-4 z-40 flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background shadow-md text-sm font-body hover:bg-foreground/90 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
