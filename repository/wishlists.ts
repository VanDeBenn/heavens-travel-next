import { http } from "#/utils/http";

const url = {
  wishlists: () => "/wishlists",
  wishlist: (id: string) => `/wishlists/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.wishlists()).send(data);
  },
  getWishlists() {
    return http.fetcher(url.wishlists());
  },
  getWishlist(id: string) {
    return http.fetcher(url.wishlist(id));
  },
  updateWishlist(id: string, data: any) {
    return http.put(url.wishlist(id)).send(data);
  },
  deleteWishlist(id: string) {
    return http.del(url.wishlist(id));
  },
};

export const wishlistRepository = {
  url,
  api,
};
