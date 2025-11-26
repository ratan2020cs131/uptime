import { useParams } from "react-router-dom";
import gitLogo from "../assets/gitIcon.svg";
import hamburgerIcon from "../assets/hamburgerIcon.svg";

const Navbar = () => {
  const { user_name = "shreeramk" } = useParams();
  return (
    <div className="flex items-center gap-4 py-2 md:py-4 bg-primary-light">
      <span className="p-1 cursor-pointer border-2 border-primary hover:bg-secondary-light rounded-md flex items-center justify-center">
        <img src={hamburgerIcon} alt="hamburger" className="w-6 h-6" />
      </span>
      <img src={gitLogo} alt="logo" className="w-8 h-8" />
      {user_name && (
        <span className="cursor-pointer text-primary text-[1.2rem] font-semibold">
          {user_name}
        </span>
      )}
    </div>
  );
};

export default Navbar;
