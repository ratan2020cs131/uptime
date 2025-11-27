import { useMemo } from "react";

const avatarColors = ["#74B3C1", "#E68A93", "#81C784", "#D9C179"];

const Badge = ({
  image,
  alt,
  count,
}: {
  image: string;
  alt?: string;
  color?: string;
  count?: number;
}) => {
  const bgColor = useMemo(
    () => avatarColors[Math.floor(Math.random() * avatarColors.length)],
    []
  );

  return (
    <div className="relative rounded-full">
      <img src={image} alt={alt} className="w-[4rem] h-[4rem]" />
      {count && (
        <p
          className="absolute bottom-0 right-0 text-primary text-[0.75rem] font-semibold rounded-full px-2 shadow-lg"
          style={{ backgroundColor: bgColor }}
        >
          x{count}
        </p>
      )}
    </div>
  );
};

export default Badge;
