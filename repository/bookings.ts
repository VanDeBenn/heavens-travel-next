import { http } from "#/utils/http";

const url = {
  bookings: () => "/bookings",
  booking: () => "/booking",
};

const api = {
  create(data: any) {
    return http.post(url.bookings()).send(data);
  },
};
