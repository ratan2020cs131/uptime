import useGetContributionActivity from "../api/useGetContributionActivity";
import { colors } from "../assets/colors";
import CustomDivider from "./Divider";
import Timeline from "./Timeline";
import lockIcon from "../assets/lockIcon.svg";
import reviewIcon from "../assets/reviewIcon.svg";
import commitIcon from "../assets/commitIcon.svg";
import issueIcon from "../assets/issueIcon.svg";
import prIcon from "../assets/prIcon.svg";
interface ContributionActivityProps {
  username: string;
  year: number;
}

const ContributionActivity = ({
  username,
  year,
}: ContributionActivityProps) => {
  const { data: activity, isLoading } = useGetContributionActivity(
    username,
    year
  );

  if (!activity) {
    return (
      <div className="h-full flex flex-col">
        {isLoading && (
          <div className="text-primary-dark text-sm py-8 text-center flex-1 flex items-center justify-center">
            Loading activity...
          </div>
        )}
      </div>
    );
  }

  const totalContributions =
    activity.contributionCalendar.totalContributions +
    activity.restrictedContributionsCount;

  return (
    <div className="min-w-0">
      <div className="mb-2 overflow-hidden">
        <CustomDivider
          fullLength
          direction="horizontal"
          color={colors.secondary.dark}
          text={year.toString()}
          textAlignment="start"
          textClassName="text-[0.8rem] font-semibold text-primary-dark"
        />

        <Timeline
          items={[
            {
              icon: lockIcon,
              content:
                activity.restrictedContributionsCount > 0 ? (
                  <div className="flex items-start gap-2 mt-1.5 text-sm">
                    <div>
                      <span className="font-semibold text-primary">
                        {activity.restrictedContributionsCount.toLocaleString()}{" "}
                        contribution
                        {activity.restrictedContributionsCount !== 1 ? "s" : ""}
                      </span>
                      <span className="text-primary-dark">
                        {" "}
                        in private repositories
                      </span>
                    </div>
                  </div>
                ) : null,
            },
            {
              icon: commitIcon,
              content:
                activity.commitContributionsByRepository.length > 0 ? (
                  <div className="space-y-3">
                    {activity.commitContributionsByRepository.map(
                      (repo, idx) => (
                        <div key={idx} className="text-sm mt-1.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-primary">
                              {repo.contributions.totalCount.toLocaleString()}{" "}
                              commit
                              {repo.contributions.totalCount !== 1 ? "s" : ""}
                            </span>
                            <span className="text-primary-dark">in</span>
                            <a
                              href={`https://github.com/${repo.repository.owner.login}/${repo.repository.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary-link underline text-primary-dark"
                            >
                              {repo.repository.owner.login}/
                              {repo.repository.name}
                            </a>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : null,
            },
            {
              icon: issueIcon,
              content:
                activity.totalIssueContributions > 0 ? (
                  <div className="text-sm mt-1.5 text-primary-dark">
                    <span className="font-semibold text-primary">
                      {activity.totalIssueContributions.toLocaleString()} issue
                      {activity.totalIssueContributions !== 1 ? "s" : ""}
                    </span>{" "}
                    opened
                  </div>
                ) : null,
            },
            {
              icon: prIcon,
              content:
                activity.totalPullRequestContributions > 0 ? (
                  <div className="text-sm mt-1.5 text-primary-dark">
                    <span className="font-semibold text-primary">
                      {activity.totalPullRequestContributions.toLocaleString()}{" "}
                      pull request
                      {activity.totalPullRequestContributions !== 1 ? "s" : ""}
                    </span>{" "}
                    opened
                  </div>
                ) : null,
            },
            {
              icon: reviewIcon,
              content:
                activity.totalPullRequestReviewContributions > 0 ? (
                  <div className="text-sm mt-1.5 text-primary-dark">
                    <span className="font-semibold text-primary">
                      {activity.totalPullRequestReviewContributions.toLocaleString()}{" "}
                      review
                      {activity.totalPullRequestReviewContributions !== 1
                        ? "s"
                        : ""}
                    </span>{" "}
                    submitted
                  </div>
                ) : null,
            },
          ].filter((item) => item.content !== null)}
        />
      </div>

      {totalContributions === 0 && (
        <div className="text-primary-dark text-sm py-4 text-center">
          No contribution activity in {year}
        </div>
      )}
    </div>
  );
};

export default ContributionActivity;
