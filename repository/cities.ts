import { http } from "#/utils/http";

const url = {
  citys: () => "/citys",
  city: (id: string) => `/citys/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.citys()).send(data);
  },
  getCitys() {
    return http.fetcher(url.citys());
  },
  getCity(id: string) {
    return http.fetcher(url.city(id));
  },
  updateCity(id: string, data: any) {
    return http.put(url.city(id)).send(data);
  },
  deleteCity(id: string) {
    return http.del(url.city(id));
  },
};

export const cityRepository = {
  url,
  api,
};
