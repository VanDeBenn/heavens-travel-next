import { http } from "#/utils/http";

const url = {
  roomHotels: () => "/room-hotels",
  roomHotel: (id: string) => `/room-hotels/${id}`,
  photoRoomHotel: () => `/photo-room-hotels/upload`,
};

const api = {
  create(data: any) {
    return http.post(url.roomHotels()).send(data);
  },
  getRoomHotels() {
    return http.fetcher(url.roomHotels());
  },
  getRoomHotel(id: string) {
    return http.fetcher(url.roomHotel(id));
  },
  updateRoomHotel(id: string, data: any) {
    return http.put(url.roomHotel(id)).send(data);
  },
  deleteRoomHotel(id: string) {
    return http.del(url.roomHotel(id));
  },
  addPhotoRoomHotel(data: any) {
    return http.post(url.photoRoomHotel()).send(data);
  },
};

export const roomHotelRepository = {
  url,
  api,
};
