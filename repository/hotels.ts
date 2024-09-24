import { http } from "#/utils/http";

const url = {
  hotels: () => "/hotels",
  hotel: (id: string) => `/hotels/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.hotels()).send(data);
  },
  getHotels() {
    return http.fetcher(url.hotels());
  },
  getHotel(id: string) {
    return http.fetcher(url.hotel(id));
  },
  updateHotel(id: string, data: any) {
    return http.put(url.hotel(id)).send(data);
  },
  deleteHotel(id: string) {
    return http.del(url.hotel(id));
  },
};

export const hotelRepository = {
  url,
  api,
};