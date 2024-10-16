import { http } from "#/utils/http";

const url = {
  carts: () => "/carts",
  addDestination: (id: string) => `/carts/${id}/destination`,
  removeDestination: (id: string, dest: string) => `/carts/${id}/${dest}`,
};

const api = {
  create(data: any) {
    return http.post(url.carts()).send(data);
  },
  addDestination(id: string, data: any) {
    return http.post(url.addDestination(id)).send(data);
  },
  removeDestination(id: string, dest: string, data: any) {
    return http.del(url.removeDestination(id, dest)).send(data);
  },
  addHotel(id: string, data: any) {
    return http.post(url.addDestination(id)).send(data);
  },
  removeHotel(id: string, dest: string, data: any) {
    return http.del(url.removeDestination(id, dest)).send(data);
  },
};

export const cartRepository = {
  url,
  api,
};
