import IconWrapper from "./IconWrapper";
import searchIcon from "../assets/searchIcon.svg";

const SearchBar = () => {
  return (
    <span
      className={`flex-shrink-0 p-1 cursor-pointer border border-primary-dark hover:bg-secondary-light active:bg-secondary-light rounded-md flex items-center gap-2 md:px-3`}
    >
      <p className="text-primary text-[0.8rem] hidden md:block">
        Type / to search
      </p>
      <IconWrapper icon={searchIcon} alt="search" size="sm" />
    </span>
  );
};

export default SearchBar;
