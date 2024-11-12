interface Hotel {
  id: string;
  name: string;
  rating: number;
  description: string;
  address: string;
  pathLocation: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  wishlists: any[] | null; // any
  categorisomehelpfulfacts: any[]; // any
  categoriesnearbylocations: any[]; // any
  categoriesfaqs: any[]; // any
  photohotels: any[]; // any
  categoriserviceamenities: any[]; // any
  roomhotels: {
    id: string;
    numberRoom: number | null;
    price: number;
    adult: number;
    children: number;
    singleBed: number | null;
    doubleBed: number | null;
    queenBed: number | null;
    kingBed: number | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
  propertypolicys: any[]; // any
  city: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}
