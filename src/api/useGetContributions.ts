import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // .env file

const useGetContributions = (username: string, year: number) => {
  return useQuery({
    queryKey: ["contributions", username, year],
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
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                        color
                      }
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
      return response.data.data.user.contributionsCollection.contributionCalendar;
    },
    enabled: !!username,
  });
};

export default useGetContributions;
