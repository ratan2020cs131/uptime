const IconWrapper = ({
  icon,
  alt,
  className,
  border = false,
  size = "md",
}: {
  icon: string;
  alt: string;
  className?: string;
  border?: boolean;
  size: "sm" | "md" | "lg";
}) => {
  return (
    <span
      className={`flex-shrink-0 cursor-pointer hover:bg-secondary-light rounded-md flex items-center justify-center active:bg-secondary-light ${
        border ? "border border-primary-dark p-1" : ""
      } ${className}`}
    >
      <img src={icon} alt={alt} className={`${sizeClasses[size]}`} />
    </span>
  );
};

export default IconWrapper;

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};
