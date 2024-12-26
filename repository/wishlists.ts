import { http } from "#/utils/http";

const url = {
  wishlists: () => "/wishlists",
  wishlist: (id: string) => `/wishlists/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.wishlists()).send(data);
  },
  remove(data: any) {
    return http.del(url.wishlists()).send(data);
  },
  deleteWishlist(id: string) {
    return http.del(url.wishlist(id));
  },
};

export const wishlistRepository = {
  url,
  api,
};
