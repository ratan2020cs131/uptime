import useGetContributionActivity from "../api/useGetContributionActivity";
import IconWrapper from "./IconWrapper";
import repoIcon from "../assets/repoIcon.svg";

interface ContributedToProps {
  username: string;
  year: number;
}

const ContributedTo = ({ username, year }: ContributedToProps) => {
  const { data: activity } = useGetContributionActivity(username, year);

  if (!activity) {
    return null;
  }

  const totalRepositories = activity.commitContributionsByRepository.length;

  if (totalRepositories === 0) {
    return (
      <h3 className="text-primary font-semibold mb-3">Activity overview</h3>
    );
  }

  return (
    <div>
      <h3 className="text-primary font-semibold mb-3">Activity overview</h3>
      <div className="flex items-center gap-2 mb-2">
        <IconWrapper icon={repoIcon} alt="repo" size="sm" />
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
                className="text-primary-link hover:underline block truncate"
              >
                {repo.repository.owner.login}/{repo.repository.name}
              </a>
            </div>
          ))}
        {totalRepositories > 3 && (
          <div className="text-primary-dark text-xs mt-2">
            and {totalRepositories - 3} other{" "}
            {totalRepositories - 3 === 1 ? "repository" : "repositories"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributedTo;
