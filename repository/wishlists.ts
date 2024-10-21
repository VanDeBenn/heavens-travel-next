import { http } from "#/utils/http";

const url = {
  wishlists: () => "/wishlists",
  wishlist: (id: string) => `/wishlists/${id}`,
  addDestination: (id: string) => `/wishlists/${id}/destination`,
  removeDestination: (id: string, dest: string) => `/wishlists/${id}/${dest}`,
};

const api = {
  create(data: any) {
    return http.post(url.wishlists()).send(data);
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
  deleteWishlist(id: string) {
    return http.del(url.wishlist(id));
  },
};

export const wishlistRepository = {
  url,
  api,
};
