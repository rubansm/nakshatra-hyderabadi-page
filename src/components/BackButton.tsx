import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (location.pathname === "/") return null;

  return (
    <button
      onClick={handleBack}
      className="fixed top-[90px] left-4 z-40 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 shadow-md text-foreground text-sm font-body hover:bg-white/50 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
