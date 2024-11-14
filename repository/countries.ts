import { http } from "#/utils/http";

const url = {
  countries: () => "/countries",
  country: (id: string) => `/countries/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.countries()).send(data);
  },
  getCountries() {
    return http.fetcher(url.countries());
  },
  getCountry(id: string) {
    return http.fetcher(url.country(id));
  },
  updateCountry(id: string, data: any) {
    return http.put(url.country(id)).send(data);
  },
  deleteCountry(id: string) {
    return http.del(url.country(id));
  },
};

export const countrieRepository = {
  url,
  api,
};
