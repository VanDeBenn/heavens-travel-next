import { http } from "#/utils/http";

const url = {
  nearbyLocations: () => "/nearby-locations",
  nearbyLocation: (id: string) => `/nearby-locations/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.nearbyLocations()).send(data);
  },
  getNearbyLocations() {
    return http.fetcher(url.nearbyLocations());
  },
  getNearbyLocation(id: string) {
    return http.fetcher(url.nearbyLocation(id));
  },
  updateNearbyLocation(id: string, data: any) {
    return http.put(url.nearbyLocation(id)).send(data);
  },
  deleteNearbyLocation(id: string) {
    return http.del(url.nearbyLocation(id));
  },
};

export const nearbyLocationRepository = {
  url,
  api,
};
