import { http } from "#/utils/http";

const url = {
  reviews: () => "/reviews",
  review: (id: string) => `/reviews/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.reviews()).send(data);
  },
  getReviews() {
    return http.fetcher(url.reviews());
  },
  getReview(id: string) {
    return http.fetcher(url.review(id));
  },
  updateReview(id: string, data: any) {
    return http.put(url.review(id)).send(data);
  },
  deleteReview(id: string) {
    return http.del(url.review(id));
  },
};

export const reviewRepository = {
  url,
  api,
};
