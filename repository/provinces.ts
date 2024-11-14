import { http } from "#/utils/http";

const url = {
  provinces: () => "/provinces",
  province: (id: string) => `/provinces/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.provinces()).send(data);
  },
  getProvinces() {
    return http.fetcher(url.provinces());
  },
  getProvince(id: string) {
    return http.fetcher(url.province(id));
  },
  updateProvince(id: string, data: any) {
    return http.put(url.province(id)).send(data);
  },
  deleteProvince(id: string) {
    return http.del(url.province(id));
  },
};

export const provinceRepository = {
  url,
  api,
};
