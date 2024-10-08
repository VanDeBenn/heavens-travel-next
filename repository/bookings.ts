import { http } from "#/utils/http";

const url = {
  bookings: () => "/bookings",
  booking: (id: string) => `/bookings/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.bookings()).send(data);
  },
  getBookings() {
    return http.fetcher(url.bookings());
  },
  getBooking(id: string) {
    return http.fetcher(url.booking(id));
  },
  updateBooking(id: string, data: any) {
    return http.put(url.booking(id)).send(data);
  },
  deleteBooking(id: string) {
    return http.del(url.booking(id));
  },
};

export const bookingRepository = {
  url,
  api,
};
