export interface Destinations {
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
  city: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  } | null;
}
[];

export interface Destination {
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
  blogs: any[]; // any
  bookings: any[]; // any
  carts: any[]; // any
  categoriesfaqs: any[]; // any
  city: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  } | null;
  photodestinations: any[]; // any
  wishlists: any[] | null; // any
}
