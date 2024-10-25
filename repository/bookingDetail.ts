import { http } from "#/utils/http";

const url = {
  bookingDetails: () => "/booking-details",
  bookingDetail: (id: string) => `/booking-details/${id}`,
  selectedCarts: (bookingId: string) => `/booking-details/${bookingId}`,
};

const api = {
  create(data: any) {
    return http.post(url.bookingDetails()).send(data);
  },
  getBookingDetails() {
    return http.fetcher(url.bookingDetails());
  },
  getBookingDetail(id: string) {
    return http.fetcher(url.bookingDetail(id));
  },
  updateBookingDetail(id: string, data: any) {
    return http.put(url.bookingDetail(id)).send(data);
  },
  createBookingDetail(bookingId: string, data: any) {
    return http.put(url.bookingDetail(bookingId)).send(data);
  },
  deleteBookingDetail(id: string) {
    return http.del(url.bookingDetail(id));
  },
};

export const bookingDetailRepository = {
  url,
  api,
};
