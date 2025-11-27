import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

interface SocialAccount {
  provider: string;
  url: string;
}

type Social = SocialAccount[];

const useGetSocial = (username: string): UseQueryResult<Social, Error> => {
  return useQuery({
    queryKey: ["social", username],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.github.com/users/${username}/social_accounts`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!username,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
};

export default useGetSocial;
