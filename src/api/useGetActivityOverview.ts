import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

interface ActivityStats {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
}

const useGetActivityOverview = (username: string, year: number) => {
  return useQuery({
    queryKey: ["activityOverview", username, year],
    queryFn: async () => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;

      const response = await axios.post(
        "https://api.github.com/graphql",
        {
          query: `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                  totalCommitContributions
                  totalIssueContributions
                  totalPullRequestContributions
                  totalPullRequestReviewContributions
                }
              }
            }
          `,
          variables: { username, from, to },
        },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data.user
        .contributionsCollection as ActivityStats;
    },
    enabled: !!username,
  });
};

export default useGetActivityOverview;

