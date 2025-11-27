import { useParams } from "react-router-dom";
import gitLogo from "../assets/gitIcon.svg";
import hamburgerIcon from "../assets/hamburgerIcon.svg";
import useGetUser from "../api/useGetUser";
import IconWrapper from "./IconWrapper";
import trayIcon from "../assets/trayIcon.svg";
import prIcon from "../assets/prIcon.svg";
import issueIcon from "../assets/issueIcon.svg";
import plusIcon from "../assets/plusIcon.svg";
import copilotIcon from "../assets/copilotIcon.svg";
import IconDropdown from "./IconDropdown";
import Divider from "./Divider";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user_name = "shreeramk" } = useParams();
  const { data: user } = useGetUser(user_name);

  return (
    <div className="flex items-center gap-4 py-2 md:py-4 px-4 bg-primary-light">
      <span className="p-1 cursor-pointer border border-primary hover:bg-secondary-light rounded-md flex items-center justify-center">
        <img src={hamburgerIcon} alt="hamburger" className="w- h-4" />
      </span>

      <img src={gitLogo} alt="logo" className="w-6 h-6" />
      {user_name && (
        <span className="cursor-pointer text-primary text-[1rem] font-semibold">
          {user?.login}
        </span>
      )}

      <span className="flex items-center gap-3 ml-auto">
        <SearchBar />
        <IconDropdown icon={copilotIcon} divider className="md:flex hidden" />
        <Divider
          direction="vertical"
          length={1.5}
          className="md:block hidden"
        />
        <IconDropdown icon={plusIcon} className="md:flex hidden" />
        <IconWrapper
          icon={issueIcon}
          alt="avatar"
          border
          size="sm"
          className="md:block hidden"
        />
        <IconWrapper
          icon={prIcon}
          alt="avatar"
          border
          size="sm"
          className="md:block hidden"
        />
        <IconWrapper icon={trayIcon} alt="avatar" border size="sm" />
        <img
          src={user?.avatar_url}
          alt="logo"
          className="w-8 h-8 ml-auto rounded-full"
        />
      </span>
    </div>
  );
};

export default Navbar;
