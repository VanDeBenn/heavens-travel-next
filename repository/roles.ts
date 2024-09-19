import { http } from "#/utils/http";

const url = {
  roles: () => "/roles",
  role: (id: string) => `/roles/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.roles()).send(data);
  },
  getRoles() {
    return http.fetcher(url.roles());
  },
  getRole(id: string) {
    return http.fetcher(url.role(id));
  },
  updateRole(id: string, data: any) {
    return http.put(url.role(id)).send(data);
  },
  deleteRole(id: string) {
    return http.del(url.role(id));
  },
};

export const roleRepository = {
  url,
  api,
};
