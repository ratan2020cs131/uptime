import useGetRepoByName from "../api/useGetRepoByName";
import type { Repository } from "../api/useGetRepos";

const languageMap = {
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Python: "#3572A5",
  Java: "#B07219",
  C: "#555555",
  "C++": "#F34B7D",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#DA5B0B",
};

const RepoCard = ({ repo }: { repo: Repository }) => {
  const { data: repoData } = useGetRepoByName(repo.full_name);
  return (
    <div className="flex flex-col gap-3 border border-secondary-dark rounded-md p-3">
      <span>
        <span className="flex justify-between">
          <a
            className="text-primary-link font-semibold text-[0.85rem] hover:underline"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.name}
          </a>

          <p className="text-primary-dark bg-primary-light text-[0.8rem] border border-secondary-dark rounded-full px-1">
            {repo.private ? "Private" : "Public"}
          </p>
        </span>

        {repo.fork && (
          <p className="text-primary-dark text-[0.8rem] leading-[1rem]">
            Forked from{" "}
            <a
              href={repoData?.parent?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline inline hover:text-primary-link"
            >
              {repoData?.parent?.full_name}
            </a>
          </p>
        )}
      </span>

      {repo.description && (
        <p className="text-primary-dark text-[0.8rem] leading-[0.85rem]">
          {repo.description}
        </p>
      )}

      <p className="text-primary-dark text-[0.8rem] mt-auto flex items-center gap-2">
        <span
          className="p-1.5 rounded-full"
          style={{
            backgroundColor:
              languageMap[repo.language as keyof typeof languageMap],
          }}
        />
        {repo.language}
      </p>
    </div>
  );
};

export default RepoCard;
