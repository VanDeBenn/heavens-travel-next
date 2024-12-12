import { http } from "#/utils/http";

const url = {
  bookings: () => "/bookings",
  booking: (id: string) => `/bookings/${id}`,
  checkout: () => "/bookings/checkout",
  invoice: (invoiceId: string) => `/bookings/invoice/${invoiceId}`,
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
  getInvoice(invoiceId: string) {
    return http.fetcher(url.invoice(invoiceId));
  },
  updateBooking(id: string, data: any) {
    return http.put(url.booking(id)).send(data);
  },
  deleteBooking(id: string) {
    return http.del(url.booking(id));
  },
  checkout(data: any) {
    return http.post(url.checkout()).send(data);
  },
};

export const bookingRepository = {
  url,
  api,
};
