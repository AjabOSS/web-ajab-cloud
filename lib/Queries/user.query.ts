import { useQuery } from "@tanstack/react-query";

import { getUserByUsername } from "../services/user.service";

import { QUERY_KEYS } from "./queryKeys";

export const useGetUserByUsername = (username: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, username],
    queryFn: () => getUserByUsername(username),
  });
};
