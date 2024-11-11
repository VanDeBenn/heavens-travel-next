import { http } from "#/utils/http";

const url = {
  // endpoint dari benya
  refunds: () => "/refunds",
  refund: (id: string) => `/refunds/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.refunds()).send(data);
  },
  getRefunds() {
    return http.fetcher(url.refunds());
  },
  getRefund(id: string) {
    return http.fetcher(url.refund(id));
  },
  updateRefund(id: string, data: any) {
    return http.put(url.refund(id)).send(data);
  },
  deleteRefund(id: string) {
    return http.del(url.refund(id));
  },
};

export const RefundRepository = {
  url,
  api,
};
