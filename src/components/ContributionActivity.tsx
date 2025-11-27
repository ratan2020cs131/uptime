import useGetContributionActivity from "../api/useGetContributionActivity";

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
        <h3 className="text-primary font-semibold">Activity overview</h3>
        {isLoading && (
          <div className="text-primary-dark text-sm py-8 text-center flex-1 flex items-center justify-center">
            Loading activity...
          </div>
        )}
      </div>
    );
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const displayMonth =
    year === currentYear ? monthNames[currentMonth] : monthNames[11];

  const totalContributions =
    activity.contributionCalendar.totalContributions +
    activity.restrictedContributionsCount;

  return (
    <div>
      <h3 className="text-primary font-semibold mb-3">Contribution activity</h3>

      {/* Contributed to section */}
      {activity.totalRepositoriesWithContributions > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-primary-dark"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-10.5A1.75 1.75 0 0 0 14.25 1H1.75zM1.5 2.75a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v10.5a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25V2.75z" />
              <path d="M5 4.75A.75.75 0 0 1 5.75 4h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 4.75zM5 7.25A.75.75 0 0 1 5.75 6.5h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.25zM5 9.75A.75.75 0 0 1 5.75 9h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 9.75z" />
            </svg>
            <h4 className="text-primary font-medium text-sm">Contributed to</h4>
          </div>
          <div className="text-sm space-y-1">
            {activity.commitContributionsByRepository
              .slice(0, 3)
              .map((repo, idx) => (
                <div key={idx}>
                  <a
                    href={`https://github.com/${repo.repository.owner.login}/${repo.repository.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-link hover:underline"
                  >
                    {repo.repository.owner.login}/{repo.repository.name}
                  </a>
                </div>
              ))}
            {activity.totalRepositoriesWithContributions > 3 && (
              <div className="text-primary-dark text-xs">
                and {activity.totalRepositoriesWithContributions - 3} other
                repositories
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-2">
        <h4 className="text-primary font-medium text-sm mb-2">
          {displayMonth} {year}
        </h4>

        {activity.restrictedContributionsCount > 0 && (
          <div className="flex items-start gap-2 mb-3 text-sm">
            <svg
              className="w-4 h-4 mt-0.5 text-primary-dark"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4 4v2h-.25A1.75 1.75 0 0 0 2 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0 0 14 13.25v-5.5A1.75 1.75 0 0 0 12.25 6H12V4a4 4 0 1 0-8 0Zm6.5 2V4a2.5 2.5 0 0 0-5 0v2Z" />
            </svg>
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
        )}

        {activity.commitContributionsByRepository.length > 0 && (
          <div className="space-y-3">
            {activity.commitContributionsByRepository.map((repo, idx) => (
              <div key={idx} className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  {repo.repository.isPrivate && (
                    <svg
                      className="w-3 h-3 text-primary-dark"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 4v2h-.25A1.75 1.75 0 0 0 2 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0 0 14 13.25v-5.5A1.75 1.75 0 0 0 12.25 6H12V4a4 4 0 1 0-8 0Zm6.5 2V4a2.5 2.5 0 0 0-5 0v2Z" />
                    </svg>
                  )}
                  <span className="font-semibold text-primary">
                    {repo.contributions.totalCount.toLocaleString()} commit
                    {repo.contributions.totalCount !== 1 ? "s" : ""}
                  </span>
                  <span className="text-primary-dark">in</span>
                  <a
                    href={`https://github.com/${repo.repository.owner.login}/${repo.repository.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-link hover:underline"
                  >
                    {repo.repository.owner.login}/{repo.repository.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activity.totalIssueContributions > 0 && (
          <div className="text-sm mt-3 text-primary-dark">
            <span className="font-semibold text-primary">
              {activity.totalIssueContributions.toLocaleString()} issue
              {activity.totalIssueContributions !== 1 ? "s" : ""}
            </span>{" "}
            opened
          </div>
        )}

        {activity.totalPullRequestContributions > 0 && (
          <div className="text-sm mt-2 text-primary-dark">
            <span className="font-semibold text-primary">
              {activity.totalPullRequestContributions.toLocaleString()} pull
              request
              {activity.totalPullRequestContributions !== 1 ? "s" : ""}
            </span>{" "}
            opened
          </div>
        )}

        {activity.totalPullRequestReviewContributions > 0 && (
          <div className="text-sm mt-2 text-primary-dark">
            <span className="font-semibold text-primary">
              {activity.totalPullRequestReviewContributions.toLocaleString()}{" "}
              review
              {activity.totalPullRequestReviewContributions !== 1 ? "s" : ""}
            </span>{" "}
            submitted
          </div>
        )}
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
