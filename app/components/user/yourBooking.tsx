// "use client";
// import React, { useState } from "react";
// import {
//   RiCalendarLine,
//   RiTeamLine,
//   RiHome3Line,
//   RiGlassesLine,
//   RiDeleteBin6Line,
// } from "react-icons/ri";
// import Image from "next/image";
// import Link from "next/link";
// import { Modal } from "antd";
// import { BookingItem, initialBookingItems } from "./myBooking";
// import { Montserrat } from "next/font/google";

// const formatCurrency = (amount: number) =>
//   `Rp${amount.toLocaleString("id-ID").replace(",", ".")}`;

// const largeMontserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["600"],
// });
// const mediumMontserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["500"],
// });
// const smallMontserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// interface ComponentsProps {
//   dataBookingDetail: any;
// }

// export default function YourBooking({ dataBookingDetail }: ComponentsProps) {
//   const [bookingItems, setBookingItems] = useState(initialBookingItems);

//    // console.log("data", dataBookingDetail);
//   // Filter hotel dan destinasi untuk menampilkan hanya 1 hotel dan 1 destinasi
//   const filteredBookingItems = [
//     ...bookingItems.filter((item) => roomHotel || destination === "Hotel").slice(0, 1),
//     ...bookingItems
//       .filter((item) => roomHotel || destination === "Destination")
//       .slice(0, 1),
//   ];

//   const handleDelete = (indexToDelete: number) => {
//     Modal.confirm({
//       title: "Are you sure?",
//       content: "Do you want to remove this item from your cart?",
//       okText: "Remove",
//       cancelText: "Cancel",
//       onOk: () => {
//         const updatedItems = filteredBookingItems.filter(
//           (_, index) => index !== indexToDelete
//         );
//         setBookingItems(updatedItems);
//       },
//     });
//   };

//   return (
//     <div className="w-full">
//       <div className="flex gap-5">
//         <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
//           <div className={`${mediumMontserrat.className} py-6 px-9`}>
//             <span className="text-lg font-semibold">Your Booking</span>
//           </div>
//           <div className="h-px bg-gray-300"></div>
//           <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full ">
//             {filteredBookingItems.map((item, index) => {
//               const totalCost = roomHotel?.priceAdult
//                 ? Number(cart?.quantityAdulcart?.quantityChildren || cart?.quantityAdult+cart?.quantityChildren.match(/\d+/)?.[0]) *
//                   roomHotel?.priceAdult
//                 : 0;
//               const adultsCount =
//                 Number(cart?.quantityAdulcart?.quantityChildren || cart?.quantityAdult+cart?.quantityChildren.match(/(\d+)\s*adult/)?.[1]) || 0;
//               const childrenCount =
//                 Number(cart?.quantityAdulcart?.quantityChildren || cart?.quantityAdult+cart?.quantityChildren.match(/(\d+)\s*child/)?.[1]) || 0;

//               return (
//                 <div
//                   key={index}
//                   className="p-3 border border-solid border-[#DBDBDB] rounded-xl w-full"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
//                       {roomHotel || destination === "Hotel" ? (
//                         <RiHome3Line size={18} color="#ffff" />
//                       ) : (
//                         <RiGlassesLine size={18} color="#ffff" />
//                       )}
//                       <span className="text-xs font-semibold text-white">
//                         {roomHotel || destination}
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <RiDeleteBin6Line
//                         size={24}
//                         color="#DC143C"
//                         className="cursor-pointer"
//                         onClick={() => handleDelete(index)}
//                       />
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 py-3">
//                     <Link href={''}>
//                       <Image
//                         src={ "https://imgs.search.brave.com/hoIxdncmtwEaAIJzTZljZdl4LAfd52BAD3Bo_qMxTjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby90/dmxrL2Jsb2cvMjAy/MS8wMi9IdXRhbi1C/YW1idS1QZW5nbGlw/dXJhbi1zaHV0dGVy/c3RvY2tfMTAxMzEz/MTAwNi5qcGc_dHI9/ZHByLTEuNSxoLTQ4/MCxxLTQwLHctMTAy/NA"}
//                         alt={roomHotel?.name || destination?.name}
//                         width={100}
//                         height={100}
//                         className="rounded-xl w-44"
//                       />
//                     </Link>
//                     <div
//                       className={`${mediumMontserrat.className} flex flex-col gap-1 w-full`}
//                     >
//                       <Link
//                         href={''}
//                         className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
//                       >
//                         {roomHotel?.name || destination?.name}
//                       </Link>
//                       <div className="flex items-center gap-1">
//                         <RiCalendarLine className="text-lg text-black" />
//                         <span className="text-xs text-black">
//                           {roomHotel || destination === "Hotel"
//                             ?cart?.startDate ? formatDate(cart.startDate) : '' -cart?.endDate ? formatDate(cart.endDate)
//                             : cart?.startDate ? formatDate(cart.startDate) : '' - cart?.endDate ? formatDate(cart.endDate)}
//                         </span>
//                       </div>
//                       <div className="flex gap-1 items-center">
//                         <RiTeamLine className="text-lg text-black" />
//                         <span className="text-xs text-black">
//                           Guests: {cart?.quantityAdulcart?.quantityChildren || cart?.quantityAdult+cart?.quantityChildren}
//                         </span>
//                       </div>

//                       <div className="flex justify-between w-full">
//                         <div className="flex items-center gap-1 w-full">
//                           <span className="text-sm font-semibold text-RoyalAmethyst-700">
//                             {roomHotel || destination === "Hotel" && item.HotelRoomType}
//                             {roomHotel || destination === "Destination" &&
//                               item.DestinationType}
//                           </span>
//                         </div>

//                         <div className="flex justify-end w-full gap-1 items-end">
//                           {roomHotel?.priceAdult && (
//                             <div className="text-sm text-black">
//                               {cart?.quantityAdulcart?.quantityChildren || cart?.quantityAdult+cart?.quantityChildren.match(/\d+/)?.[0]} x
//                               {formatCurrency(roomHotel?.priceAdult)}
//                             </div>
//                           )}

//                           {destination?.priceAdult && adultsCount > 0 && (
//                             <div className="text-sm text-black">
//                               {adultsCount} x
//                               {formatCurrency(destination?.priceAdult)}
//                               {childrenCount > 0 &&
//                                 destination?.priceChildren && (
//                                   <>
//                                     {" - "}
//                                     {childrenCount} x
//                                     {formatCurrency(
//                                       destination?.priceChildren
//                                     )}
//                                   </>
//                                 )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="h-px bg-gray-300"></div>
//                   <div className="pt-5 pb-3 flex justify-end w-full gap-2">
//                     <div
//                       className={`${mediumMontserrat.className} flex flex-col gap-1`}
//                     >
//                       <span className="font-semibold text-xs">Total Price</span>
//                       <span className="text-sm font-semibold text-InfernoEcho-600">
//                         {roomHotel || destination === "Hotel" &&
//                           formatCurrency(
//                             (Number(cart?.quantityAdulcart?.quantityChildren || cart?.quantityAdult+cart?.quantityChildren.match(/\d+/)?.[0]) || 1) *
//                               (roomHotel?.priceAdult || 0)
//                           )}
//                         {roomHotel || destination === "Destination" &&
//                           formatCurrency(
//                             adultsCount * (destination?.priceAdult || 0) +
//                               childrenCount *
//                                 (destination?.priceChildren || 0)
//                           )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import {
  RiCalendarLine,
  RiTeamLine,
  RiHome3Line,
  RiGlassesLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { BookingItem, initialBookingItems } from "./myBooking";
import { Montserrat } from "next/font/google";

const formatCurrency = (amount: number) =>
  `Rp${amount.toLocaleString("id-ID").replace(",", ".")}`;

const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

interface ComponentsProps {
  dataBookingDetail: any;
  setSubmit: any;
}

export default function YourBooking({
  dataBookingDetail,
  setSubmit,
}: ComponentsProps) {
  const [bookingItems, setBookingItems] = useState(initialBookingItems);
  setSubmit(false);
  // Filter hotel dan destinasi untuk menampilkan hanya 1 hotel dan 1 destinasi
  // const filteredBookingItems = [
  //   ...bookingItems.filter((item) => roomHotel || destination === "Hotel").slice(0, 1),
  //   ...bookingItems
  //     .filter((item) => roomHotel || destination === "Destination")
  //     .slice(0, 1),
  // ];

  // const handleDelete = (indexToDelete: number) => {
  //   Modal.confirm({
  //     title: "Are you sure?",
  //     content: "Do you want to remove this item from your cart?",
  //     okText: "Remove",
  //     cancelText: "Cancel",
  //     onOk: () => {
  //       const updatedItems = filteredBookingItems.filter(
  //         (_, index) => index !== indexToDelete
  //       );
  //       setBookingItems(updatedItems);
  //     },
  //   });
  // };

  const allDestinations = dataBookingDetail.flatMap(
    (item: any) =>
      // item.cart.map((item: any) => item.destination?.name)
      item.cart.destination?.name
  );

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Your Booking</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full ">
            {dataBookingDetail.map((item: any) => {
              const { cart } = item;
              const { destination, roomHotel } = cart;

              const formatDate = (dateString: string) =>
                new Date(dateString).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

              // const totalCost = roomHotel?.priceAdult
              //   ? Number(
              //       cart?.quantityAdult cart?.quantityChildren ||
              //         cart?.quantityAdult +
              //           cart?.quantityChildren.match(/\d+/)?.[0]
              //     ) * roomHotel?.priceAdult
              //   : 0;
              // const adultsCount =
              //   Number(
              //     cart?.quantityAdult cart?.quantityChildren ||
              //       cart?.quantityAdult +
              //         cart?.quantityChildren.match(/(\d+)\s*adult/)?.[1]
              //   ) || 0;
              // const childrenCount =
              //   Number(
              //     cart?.quantityAdult cart?.quantityChildren ||
              //       cart?.quantityAdult +
              //         cart?.quantityChildren.match(/(\d+)\s*child/)?.[1]
              //   ) || 0;

              return (
                <div
                  key={item.id}
                  className="p-3 border border-solid border-[#DBDBDB] rounded-xl w-full"
                >
                  <div className="flex justify-between items-center">
                    <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                      {roomHotel ? (
                        <RiHome3Line size={18} color="#ffff" />
                      ) : (
                        <RiGlassesLine size={18} color="#ffff" />
                      )}
                      <span className="text-xs font-semibold text-white">
                        {/* {roomHotel?. ? "Hotel" : "Destination"} */}
                        {roomHotel?.name || destination?.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <RiDeleteBin6Line
                        size={24}
                        color="#DC143C"
                        className="cursor-pointer"
                        // onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <Link href={""}>
                      <Image
                        src={
                          "https://imgs.search.brave.com/hoIxdncmtwEaAIJzTZljZdl4LAfd52BAD3Bo_qMxTjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby90/dmxrL2Jsb2cvMjAy/MS8wMi9IdXRhbi1C/YW1idS1QZW5nbGlw/dXJhbi1zaHV0dGVy/c3RvY2tfMTAxMzEz/MTAwNi5qcGc_dHI9/ZHByLTEuNSxoLTQ4/MCxxLTQwLHctMTAy/NA"
                        }
                        alt={roomHotel?.name || destination?.name}
                        width={100}
                        height={100}
                        className="rounded-xl w-44"
                      />
                    </Link>
                    <div
                      className={`${mediumMontserrat.className} flex flex-col gap-1 w-full`}
                    >
                      <Link
                        href={""}
                        className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                      >
                        {roomHotel?.name || destination?.name}
                      </Link>
                      <div className="flex items-center gap-1">
                        <RiCalendarLine className="text-lg text-black" />
                        <span className="text-xs text-black">
                          {cart?.startDate && cart?.endDate
                            ? `${formatDate(cart.startDate)} - ${formatDate(
                                cart.endDate
                              )}`
                            : ""}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <RiTeamLine className="text-lg text-black" />
                        <span className="text-xs text-black">
                          Guests: {cart?.quantityAdult + cart?.quantityChildren}
                        </span>
                      </div>

                      <div className="flex justify-between w-full">
                        <div className="flex gap-1 w-full">
                          <span className="text-sm font-semibold text-RoyalAmethyst-700">
                            {roomHotel ||
                              (destination && `${destination?.name} Tour`)}
                          </span>
                        </div>

                        <div className="flex justify-end w-full gap-1 items-end">
                          {roomHotel?.priceAdult && (
                            <div className="text-sm text-black">
                              {cart?.quantityAdult + cart?.quantityChildren ||
                                cart?.quantityAdult +
                                  cart?.quantityChildren.match(/\d+/)?.[0]}
                              x{formatCurrency(roomHotel?.priceAdult)}
                            </div>
                          )}

                          {destination?.priceAdult &&
                            cart?.quantityAdult > 0 && (
                              <div className="text-sm text-black">
                                {cart?.quantityAdult} {"Adult"} x
                                {formatCurrency(destination?.priceAdult)} <br />
                                {cart?.quantityChildren > 0 &&
                                  destination?.priceChildren && (
                                    <>
                                      {cart?.quantityChildren} {"Children"} x
                                      {formatCurrency(
                                        destination?.priceChildren
                                      )}
                                    </>
                                  )}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-300"></div>
                  <div className="pt-5 pb-3 flex justify-end w-full gap-2">
                    <div
                      className={`${mediumMontserrat.className} flex flex-col gap-1`}
                    >
                      <span className="font-semibold text-xs">Total Price</span>

                      <span className="text-sm font-semibold text-InfernoEcho-600">
                        {destination &&
                          formatCurrency(
                            (cart?.quantityAdult || 0) *
                              (destination?.priceAdult || 0) +
                              (cart?.quantityChildren || 0) *
                                (destination?.priceChildren || 0)
                          )}
                        {roomHotel &&
                          formatCurrency(
                            ((cart?.quantityAdult || 0) +
                              (cart?.quantityChildren || 0) || 1) *
                              (roomHotel?.priceAdult || 0)
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* {dataBookingDetail.map((item: any) => {
              const { cart } = item;
              const { destination, roomHotel } = cart;
              //  // console.log(item.id);
              return (
                <div className="" key={item.id}>
                  <div className="">{destination?.name}</div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
