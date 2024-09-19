import { http } from "#/utils/http";

const url = {
  carts: () => "/carts",
  cart: (id: string) => `/carts/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.carts()).send(data);
  },
  getCarts() {
    return http.fetcher(url.carts());
  },
  getCart(id: string) {
    return http.fetcher(url.cart(id));
  },
  updateCart(id: string, data: any) {
    return http.put(url.cart(id)).send(data);
  },
  deleteCart(id: string) {
    return http.del(url.cart(id));
  },
};

export const cartRepository = {
  url,
  api,
};
