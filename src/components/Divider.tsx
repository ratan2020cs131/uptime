import { colors } from "../assets/colors";

interface DividerProps {
  length?: number;
  color?: string;
  direction?: "horizontal" | "vertical";
  className?: string;
  fullLength?: boolean;
  dividerStyle?: "dashed" | "dotted" | "solid";
  lengthPercent?: number;
}

const CustomDivider: React.FC<DividerProps> = ({
  direction = "vertical",
  color = colors.primary.DEFAULT,
  length,
  className = "",
  fullLength = false,
  dividerStyle = "solid",
  lengthPercent,
}) => (
  <section
    className={className}
    style={{
      borderStyle: dividerStyle,
      borderColor: color,
      borderWidth: direction === "vertical" ? "0 1px 0 0" : "0 0 1px 0",
      width:
        direction === "vertical"
          ? "1px"
          : lengthPercent
          ? `${lengthPercent}%`
          : fullLength
          ? "100%"
          : length
          ? `${length}rem`
          : "100%",
      height:
        direction === "horizontal"
          ? "1px"
          : lengthPercent
          ? `${lengthPercent}%`
          : fullLength
          ? "100%"
          : length
          ? `${length}rem`
          : "100%",
    }}
  />
);

export default CustomDivider;
