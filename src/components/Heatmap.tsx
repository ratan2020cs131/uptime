import useGetContributions from "../api/useGetContributions";
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";
import ActivityOverview from "./ActivityOverview";
import ContributionActivity from "./ContributionActivity";
import ContributedTo from "./ContributedTo";
import CustomDivider from "./Divider";
import { colors } from "../assets/colors";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

const Heatmap = ({ year, user_name }: { year: number; user_name: string }) => {
  const { data: contributionCalendar } = useGetContributions(user_name, year);

  const chartData = useMemo(() => {
    if (!contributionCalendar?.weeks) return [];

    const data: [string, number][] = [];
    contributionCalendar.weeks.forEach((week: ContributionWeek) => {
      week.contributionDays.forEach((day: ContributionDay) => {
        data.push([day.date, day.contributionCount]);
      });
    });
    return data;
  }, [contributionCalendar]);

  const maxContribution = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.max(...chartData.map(([_, count]) => count));
  }, [chartData]);

  const option = {
    tooltip: {
      position: "top",
      formatter: (params: any) => {
        const count = params.data[1];
        return `${count} contribution${count !== 1 ? "s" : ""}`;
      },
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "transparent",
      padding: [0, 6],
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    visualMap: {
      min: 0,
      max: maxContribution > 0 ? maxContribution : 1,
      calculable: false,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      inRange: {
        color: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
      },
      show: false,
    },
    calendar: {
      top: 20,
      left: 30,
      right: 30,
      cellSize: ["auto", 13],
      range: year.toString(),
      itemStyle: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 2,
      },
      yearLabel: { show: false },
      monthLabel: {
        nameMap: "en",
        fontSize: 11,
        color: "#8b949e",
      },
      dayLabel: {
        fontSize: 10,
        color: "#8b949e",
        nameMap: ["", "Mon", "", "Wed", "", "Fri", ""],
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: chartData,
        itemStyle: {
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#fff",
          width: 10,
          height: 10,
        },
      },
    ],
  };

  return (
    <div className="border border-secondary-dark rounded-md overflow-x-auto">
      <>
        {chartData.length > 0 ? (
          <div className="p-3">
            <div className="overflow-x-auto scroll-on-scroll">
              <div style={{ minWidth: "700px" }}>
                <ReactECharts
                  option={option}
                  style={{ height: "120px", width: "100%" }}
                  opts={{ renderer: "canvas" }}
                />
              </div>
            </div>

            <span className="flex flex-wrap gap-2 justify-between">
              <p className="text-primary-dark text-[0.8rem]">
                Learn how we count contributions
              </p>
              <span className="flex gap-2 items-center">
                <p className="text-primary-dark text-[0.8rem]">Less</p>
                <span className="text-primary-link">
                  <span className="flex items-center gap-1">
                    {[
                      "#ebedf0",
                      "#9be9a8",
                      "#40c463",
                      "#30a14e",
                      "#216e39",
                    ].map((color) => (
                      <span
                        key={color}
                        className="inline-block w-3 h-3 rounded-[3px]"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                </span>
                <p className="text-primary-dark text-[0.8rem]">More</p>
              </span>
            </span>
          </div>
        ) : (
          <div className="text-primary text-sm py-8 text-center">
            Loading contributions...
          </div>
        )}

        {/* Activity overview section */}
        <CustomDivider
          direction="horizontal"
          fullLength
          color={colors.secondary.dark}
        />

        <div className="p-3">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-4">
            <div>
              <ContributedTo username={user_name} year={year} />
            </div>
            <CustomDivider
              direction="vertical"
              fullLength
              color={colors.secondary.dark}
              className="hidden lg:block"
            />
            <div>
              <ActivityOverview username={user_name} year={year} />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Heatmap;
