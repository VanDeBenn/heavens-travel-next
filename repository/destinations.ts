import { http } from "#/utils/http";

const url = {
  destinations: () => "/destinations",
  destination: (id: string) => `/destinations/${id}`,
  destinationByCityName: () => `/destinations/city`,
  photoDestination: () => `/photo-destinations/upload`,
};

const api = {
  create(data: any) {
    return http.post(url.destinations()).send(data);
  },
  getDestinations() {
    return http.get(url.destinations());
  },
  getDestination(id: string) {
    return http.get(url.destination(id));
  },
  getDestinationByCityName(cityName: any) {
    return http.post(url.destinationByCityName()).send(cityName);
  },
  updateDestination(id: string, data: any) {
    return http.put(url.destination(id)).send(data);
  },
  deleteDestination(id: string) {
    return http.del(url.destination(id));
  },
  addPhotoDestination(data: any) {
    return http.post(url.photoDestination()).send(data);
  },
};

export const destinationRepository = {
  url,
  api,
};
