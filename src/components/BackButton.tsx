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
      className="fixed top-[90px] left-4 z-40 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-xl border border-white/40 shadow-md text-foreground hover:bg-white/50 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>
  );
};

export default BackButton;
