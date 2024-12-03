import { http } from "#/utils/http";

const url = {
  reviews: () => "/reviews",
  review: (id: string) => `/reviews/${id}`,
  photoReview: () => `/photo-reviews/upload`,
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
  addPhotoReview(data: any) {
    return http.post(url.photoReview()).send(data);
  },
};

export const reviewRepository = {
  url,
  api,
};
