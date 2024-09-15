import { http } from "#/utils/http";
import useSWR from "swr";
import type { SWRMutationConfiguration } from "swr/mutation";
import useSWRMutation from "swr/mutation";

export interface AuthBody {
  fullName: string;
  email: string;
  phoneNumber: string;
  role_id: string;
}

interface ErrorResponse {
  body: {
    error: string;
  };
}

interface SuperagentError {
  status: number;
  response: ErrorResponse;
}

const url = {
  users: () => "/users",
  userId: (id: string) => `/users/${id}`,
};

const hooks = {
  useUsers() {
    return useSWR(url.users(), http.fetcher);
  },
};

const api = {
  getAllUsers(data: any) {
    return http.post(url.users()).send(data);
  },
  getUser(id: string) {
    return http.get(url.userId(id));
  },
};

export const usersRepository = {
  url,
  hooks,
  api,
};
