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
                ? `${reviewPercent}%\nCode review`
                : "Code review",
            max: maxValue,
          },
          {
            name: commitPercent > 0 ? `${commitPercent}%\nCommits` : "Commits",
            max: maxValue,
          },
          {
            name:
              prPercent > 0 ? `${prPercent}%\nPull requests` : "Pull requests",
            max: maxValue,
          },
          {
            name: issuePercent > 0 ? `${issuePercent}%\nIssues` : "Issues",
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
        extraCssText: "white-space: normal;",
        formatter: (params: any) => {
          if (!params) {
            return "";
          }
          // For radar charts, params can be an array or a single object
          const param = Array.isArray(params) ? params[0] : params;
          if (!param || !param.value) {
            return "";
          }

          const indicatorNames = [
            "Code review",
            "Commits",
            "Pull requests",
            "Issues",
          ];
          const values = param.value || [];
          const total =
            activityStats.totalCommitContributions +
            activityStats.totalIssueContributions +
            activityStats.totalPullRequestContributions +
            activityStats.totalPullRequestReviewContributions;

          const rows = indicatorNames
            .map((name, index) => {
              const value = values[index] || 0;
              const percent = total > 0 ? Math.round((value / total) * 100) : 0;
              const label = percent > 0 ? `${percent}% ${name}` : name;
              return `<tr><td style="text-align: left; padding-right: 10px; color: #fff;">${label}</td><td style="text-align: right; color: #fff;">${value}</td></tr>`;
            })
            .join("");
          
          return `<table style="width: 100%;">${rows}</table>`;
        },
      },
    };
  }, [activityStats, chartData, maxValue]);

  if (!activityStats || chartData.length === 0) {
    return (
      <div className="h-full flex flex-col min-h-[5rem]">
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
