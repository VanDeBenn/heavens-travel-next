import { http } from "#/utils/http";

const url = {
  facilities: () => "/facilities",
  facility: (id: string) => `/facilities/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.facilities()).send(data);
  },
  getRoles() {
    return http.fetcher(url.facilities());
  },
  getRole(id: string) {
    return http.fetcher(url.facility(id));
  },
  updateRole(id: string, data: any) {
    return http.put(url.facility(id)).send(data);
  },
  deleteRole(id: string) {
    return http.del(url.facility(id));
  },
};

export const facilitieRepository = {
  url,
  api,
};
