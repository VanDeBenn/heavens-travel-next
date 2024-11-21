export interface Users {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  gender: "male" | "female" | "other";
  birthDate: string | null;
  address: string | null;
  password: string;
  refreshToken: string;
  resetToken: string | null;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  city: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  role: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}
[];

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  gender: string;
  birthDate: string | null;
  address: string | null;
  password: string;
  refreshToken: string;
  resetToken: string | null;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  blogs: any[]; // any
  bookings: any[]; // any
  carts: any[]; // any
  city: any;
  replyreviews: any[]; // any
  reports: any[]; // any
  reviews: any[]; // any
  role: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  wishlists: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    destination: {
      id: string;
      name: string;
      priceAdult: number;
      priceChildren: number;
      quantityAdult: number | null;
      quantityChildren: number | null;
      startDate: string | null;
      endDate: string | null;
      rating: number;
      maxCapacity: number;
      description: string;
      address: string;
      pathLocation: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    } | null;
    hotel: string | null;
  };
}
