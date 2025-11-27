import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

interface Repository {
  name: string;
  owner: {
    login: string;
  };
  isPrivate: boolean;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Activity {
  totalRepositoriesWithContributions: number;
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: {
      contributionDays: ContributionDay[];
    }[];
  };
  commitContributionsByRepository: {
    contributions: {
      totalCount: number;
    };
    repository: Repository;
  }[];
}

const useGetContributionActivity = (username: string, year: number) => {
  return useQuery({
    queryKey: ["contributionActivity", username, year],
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
                  totalRepositoriesWithContributions
                  totalCommitContributions
                  totalIssueContributions
                  totalPullRequestContributions
                  totalPullRequestReviewContributions
                  restrictedContributionsCount
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                  commitContributionsByRepository(maxRepositories: 5) {
                    contributions {
                      totalCount
                    }
                    repository {
                      name
                      owner {
                        login
                      }
                      isPrivate
                    }
                  }
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
      return response.data.data.user.contributionsCollection as Activity;
    },
    enabled: !!username,
  });
};

export default useGetContributionActivity;

