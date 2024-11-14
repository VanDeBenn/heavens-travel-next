import { http } from "#/utils/http";

const url = {
  cities: () => "/cities",
  city: (id: string) => `/cities/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.cities()).send(data);
  },
  getCities() {
    return http.fetcher(url.cities());
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

export const citieRepository = {
  url,
  api,
};
