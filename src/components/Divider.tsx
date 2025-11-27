import { colors } from "../assets/colors";

interface DividerProps {
  length?: number;
  color?: string;
  direction?: "horizontal" | "vertical";
  className?: string;
  fullLength?: boolean;
  dividerStyle?: "dashed" | "dotted" | "solid";
  lengthPercent?: number;
  text?: string;
  textAlignment?: "start" | "center" | "end";
  textClassName?: string;
}

const CustomDivider: React.FC<DividerProps> = ({
  direction = "vertical",
  color = colors.primary.DEFAULT,
  length,
  className = "",
  fullLength = false,
  dividerStyle = "solid",
  lengthPercent,
  text,
  textAlignment = "center",
  textClassName = "",
}) => {
  // If text is provided and direction is horizontal, render text with divider
  if (text && direction === "horizontal") {
    return (
      <div className={`flex items-center gap-3 w-full ${className}`}>
        {textAlignment !== "start" && (
          <div
            style={{
              borderStyle: dividerStyle,
              borderColor: color,
              borderWidth: "0 0 1px 0",
              flex: textAlignment === "center" ? 1 : "0 1 auto",
              minWidth: textAlignment === "end" ? "100%" : "auto",
            }}
          />
        )}
        <span className={`whitespace-nowrap ${textClassName}`}>{text}</span>
        {textAlignment !== "end" && (
          <div
            style={{
              borderStyle: dividerStyle,
              borderColor: color,
              borderWidth: "0 0 1px 0",
              flex: textAlignment === "center" ? 1 : "0 1 auto",
              minWidth: textAlignment === "start" ? "100%" : "auto",
            }}
          />
        )}
      </div>
    );
  }

  // If text is provided and direction is vertical, render text with divider
  if (text && direction === "vertical") {
    const alignClass =
      textAlignment === "start"
        ? "items-start"
        : textAlignment === "end"
        ? "items-end"
        : "items-center";

    return (
      <div className={`flex flex-col gap-3 h-full ${alignClass} ${className}`}>
        {textAlignment !== "start" && (
          <div
            style={{
              borderStyle: dividerStyle,
              borderColor: color,
              borderWidth: "0 1px 0 0",
              flex: textAlignment === "center" ? 1 : "0 1 auto",
              minHeight: textAlignment === "end" ? "100%" : "auto",
              width: "1px",
            }}
          />
        )}
        <span className={`whitespace-nowrap ${textClassName}`}>{text}</span>
        {textAlignment !== "end" && (
          <div
            style={{
              borderStyle: dividerStyle,
              borderColor: color,
              borderWidth: "0 1px 0 0",
              flex: textAlignment === "center" ? 1 : "0 1 auto",
              minHeight: textAlignment === "start" ? "100%" : "auto",
              width: "1px",
            }}
          />
        )}
      </div>
    );
  }

  // Default divider without text
  return (
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
};

export default CustomDivider;
