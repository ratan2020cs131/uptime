import chevronDownIcon from "../assets/chevdownIcon.svg";
import IconWrapper from "./IconWrapper";
import Divider from "./Divider";

const IconDropdown = ({
  icon,
  divider = false,
  className = "",
}: {
  icon: string;
  divider?: boolean;
  className?: string;
}) => {
  return (
    <span
      className={`flex-shrink-0 p-1 cursor-pointer border border-primary-dark hover:bg-secondary-light rounded-md flex items-center gap-2 ${className}`}
    >
      <IconWrapper icon={icon} alt="icon" size="sm" />
      {divider && <Divider direction="vertical" length={1} />}
      <IconWrapper icon={chevronDownIcon} alt="chevron down" size="sm" />
    </span>
  );
};

export default IconDropdown;
