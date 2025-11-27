import { type ReactNode } from "react";
import IconWrapper from "./IconWrapper";
import { colors } from "../assets/colors";

interface TimelineItem {
  icon: string;
  content: ReactNode;
  alt?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  iconSize?: "sm" | "md" | "lg";
  lineColor?: string;
  iconBgColor?: string;
  iconBorderColor?: string;
}

const Timeline = ({
  items,
  iconSize = "sm",
  lineColor = colors.secondary.dark,
  iconBgColor = "bg-primary-light",
  iconBorderColor = "border-secondary-dark",
}: TimelineProps) => {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 relative">
          {/* Icon column */}
          <div className="flex flex-col items-center flex-shrink-0">
            {/* Top line */}

            <div
              className="w-[1px] h-4"
              style={{ backgroundColor: lineColor }}
            />

            {/* Icon container */}
            <span
              className={`${iconBgColor} ${
                iconBorderColor ? `border ${iconBorderColor}` : ""
              } p-2 rounded-full`}
            >
              <IconWrapper
                icon={item.icon}
                alt={item.alt || `Timeline icon ${index + 1}`}
                size={iconSize}
              />
            </span>

            {/* Bottom line */}

            <div
              className="w-[1px] flex-1 min-h-4"
              style={{ backgroundColor: lineColor }}
            />
          </div>

          {/* Content column */}
          <div className="flex-1 pb-8 last:pb-0">
            <div className="pt-4">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
