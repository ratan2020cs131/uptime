import ReactECharts from "echarts-for-react";
import useGetActivityOverview from "../api/useGetActivityOverview";
import { useMemo } from "react";

interface ActivityOverviewProps {
  username: string;
  year: number;
}

const ActivityOverview = ({ username, year }: ActivityOverviewProps) => {
  const { data: activityStats, isLoading } = useGetActivityOverview(
    username,
    year
  );

  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const chartData = useMemo(() => {
    if (!activityStats) return [];

    const total =
      activityStats.totalPullRequestReviewContributions +
      activityStats.totalCommitContributions +
      activityStats.totalIssueContributions +
      activityStats.totalPullRequestContributions;
    if (total === 0) return [];

    return [
      activityStats.totalPullRequestReviewContributions,
      activityStats.totalCommitContributions,
      activityStats.totalPullRequestContributions,
      activityStats.totalIssueContributions,
    ];
  }, [activityStats]);

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 100;
    return Math.max(...chartData);
  }, [chartData]);

  const option = useMemo(() => {
    if (!activityStats) return {};

    const total =
      activityStats.totalCommitContributions +
      activityStats.totalIssueContributions +
      activityStats.totalPullRequestContributions +
      activityStats.totalPullRequestReviewContributions;

    const commitPercent = getPercentage(
      activityStats.totalCommitContributions,
      total
    );
    const prPercent = getPercentage(
      activityStats.totalPullRequestContributions,
      total
    );
    const issuePercent = getPercentage(
      activityStats.totalIssueContributions,
      total
    );
    const reviewPercent = getPercentage(
      activityStats.totalPullRequestReviewContributions,
      total
    );

    return {
      radar: {
        indicator: [
          {
            name:
              reviewPercent > 0
                ? `${reviewPercent}% Code review`
                : "Code review",
            max: maxValue,
          },
          {
            name: commitPercent > 0 ? `${commitPercent}% Commits` : "Commits",
            max: maxValue,
          },
          {
            name:
              prPercent > 0 ? `${prPercent}% Pull requests` : "Pull requests",
            max: maxValue,
          },
          {
            name: issuePercent > 0 ? `${issuePercent}% Issues` : "Issues",
            max: maxValue,
          },
        ],
        splitArea: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#40c463",
          },
        },
        splitLine: {
          show: false,
        },
        axisName: {
          color: "#24292f",
          fontSize: 11,
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: chartData,
              areaStyle: {
                color: "rgba(64, 196, 99, 0.3)",
              },
              lineStyle: {
                color: "#40c463",
                width: 2,
              },
              itemStyle: {
                color: "#40c463",
              },
            },
          ],
        },
      ],
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "transparent",
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
      },
    };
  }, [activityStats, chartData, maxValue]);

  if (!activityStats || chartData.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <h3 className="text-primary font-semibold mb-3">Activity overview</h3>
        {isLoading && (
          <div className="text-primary-dark text-sm py-8 text-center flex-1 flex items-center justify-center">
            Loading activity...
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <ReactECharts
        option={option}
        style={{ height: "200px" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};

export default ActivityOverview;
