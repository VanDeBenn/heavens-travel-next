import { http } from "#/utils/http";

const url = {
  categoriServiceAmenities: () => "/categori-service-amenities",
  categoriServiceAmeniti: (id: string) => `/categori-service-amenities/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.categoriServiceAmenities()).send(data);
  },
  getCategoriServiceAmenities() {
    return http.fetcher(url.categoriServiceAmenities());
  },
  getCategoriServiceAmeniti(id: string) {
    return http.fetcher(url.categoriServiceAmeniti(id));
  },
  updateCategoriServiceAmeniti(id: string, data: any) {
    return http.put(url.categoriServiceAmeniti(id)).send(data);
  },
  deleteCategoriServiceAmeniti(id: string) {
    return http.del(url.categoriServiceAmeniti(id));
  },
};

export const categoriServiceAmenitiRepository = {
  url,
  api,
};
