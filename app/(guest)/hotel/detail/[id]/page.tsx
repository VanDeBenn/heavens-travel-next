// "use client";
// import { cartRepository } from "#/repository/carts";
// import { hotelRepository } from "#/repository/hotels";
// import { wishlistRepository } from "#/repository/wishlists";
// import React, { useEffect, useState } from "react";

// export default async function page({ params }: { params: { id: string } }) {
//   const [data, setData] = useState<any[]>([]);

//   const fetchHotel = async () => {
//     try {
//       const res = await hotelRepository.api.getHotel(params.id);
//       setData(res.body.data);
//     } catch (error) {}
//   };

//   const handleWishlist = async (values: any) => {
//     try {
//       const data = {
//         userId: localStorage.getItem("_id"),
//         hotelId: params.id,
//       };
//       const req = await wishlistRepository.api.create(data);
//     } catch (error: any) {
//       const errorMessage = error.response;
//       // console.log(errorMessage);
//     }
//   };

//   const handleCart = async () => {
//     try {
//       const data = {
//         userId: localStorage.getItem("_id"),
//         hotelId: params.id,
//       };
//       const req = await cartRepository.api.create(data);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     fetchHotel();
//   }, []);
//   return (
//     <>
//       <div>page {params.id} </div>
//       <div>page {params.id} </div>
//       <button onClick={handleWishlist} className="">
//         wishlist
//       </button>
//       <br />
//       <button onClick={handleCart} className="">
//         cart
//       </button>
//     </>
//   );
// }
