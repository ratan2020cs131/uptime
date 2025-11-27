import { useParams } from "react-router-dom";
import useGetRepos from "../api/useGetRepos";
import RepoCard from "../components/RepoCard";

const Repositories = () => {
  const { user_name = "shreeramk" } = useParams();
  const { data: repos } = useGetRepos(user_name);

  const getTopRepos = () => {
    if (!repos) return [];

    const withLanguage = repos
      .filter((repo) => repo.language !== null)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    if (withLanguage.length >= 6) {
      return withLanguage.slice(0, 6);
    }

    const withoutLanguage = repos
      .filter((repo) => repo.language === null)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    return [...withLanguage, ...withoutLanguage].slice(0, 6);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-primary text-[1rem]">Popular repositories</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getTopRepos().map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default Repositories;
