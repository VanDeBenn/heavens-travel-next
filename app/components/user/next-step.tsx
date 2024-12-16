"use client";
import { Button, Spin, Steps, message } from "antd";
import { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import {
  RiFileUserLine,
  RiBankCardLine,
  RiCheckDoubleLine,
  RiGlassesLine,
  RiHome3Line,
  RiCalendarLine,
  RiTeamLine,
} from "react-icons/ri";
import YourBooking from "./yourBooking";
import GuestForm from "./guestForm";
import PaymentMethod from "./paymentMethod";
import DoneOrder from "./doneOrder";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { bookingRepository } from "#/repository/bookings";
import { useRouter } from "next/navigation";

const largeMontserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });
const mediumMontserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });
const smallMontserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });

const { Step } = Steps;

export default function NextStep() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dataBookingDetail, setDataBookingDetail] = useState<any[]>([]);
  const [dataBooking, setDataBooking] = useState<any>({});
  const [dataUser, setDataUser] = useState<any>(null);
  const [submitForms, setSubmitForms] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<any>();

  const redirectXendit = localStorage.getItem("_xendit");
  const bookingId = localStorage.getItem("_booking");

  const getBooking = async () => {
    try {
      const res = await bookingRepository.api.getBooking(bookingId || "");
      setDataBooking(res.data);
      setDataBookingDetail(res.data.bookingdetails || []);
      setDataUser(res.data.user || null);
    } catch (error) {
      console.error("Error fetching booking data:", error);
      message.error("Failed to fetch booking data.");
    }
  };

  useEffect(() => {
    if (bookingId) {
      getBooking();
    }
  }, [bookingId]);

  const next = () => {
    setLoading(true);
    setSubmitForms(true);

    setTimeout(() => {
      setCompletedSteps((prev) => [...prev, current]);
      setCurrent((prev) => prev + 1);
      setLoading(false);
      setSubmitForms(false);
    }, 2000);
  };

  const prev = () => {
    setLoading(true);
    setTimeout(() => {
      setCompletedSteps((prev) => prev.filter((step) => step !== current - 1));
      setCurrent((prev) => prev - 1);
      setLoading(false);
    }, 1200);
  };

  const finish = () => {
    message.success("All steps completed!");
    localStorage.removeItem("_xendit");
    router.push("/profile/bookings");
  };

  useEffect(() => {
    if (!paymentStatus) {
      const getPaymentStatus = async () => {
        try {
          const res = await bookingRepository.api.getInvoice(
            dataBooking?.payment?.invoiceId
          );
          // console.log(res);
          setPaymentStatus(res?.data?.status);
        } catch (error) {
          console.error("Error fetching payment status:", error);
        }
      };

      getPaymentStatus();
    }
  }, [dataBooking?.payment?.invoiceId]);

  // console.log(paymentStatus);
  useEffect(() => {
    if (paymentStatus === "PAID") {
      localStorage.setItem("_xendit", "success");
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (redirectXendit === "success") {
      setCurrent(3);
      localStorage.removeItem("_xendit");
    }
  }, [redirectXendit]);

  const steps = [
    {
      content: <YourBooking dataBookingDetail={dataBookingDetail} />,
      icon:
        loading && current === 0 ? (
          <Spin size="small" />
        ) : (
          <LuShoppingCart
            size={24}
            color={
              completedSteps.includes(0) || current === 0 ? "#4F28D9" : "#000"
            }
          />
        ),
    },
    {
      content: <GuestForm dataUser={dataUser} submit={submitForms} />,
      icon:
        loading && current === 1 ? (
          <Spin size="small" />
        ) : (
          <RiFileUserLine
            size={24}
            color={
              completedSteps.includes(1) || current === 1 ? "#4F28D9" : "#000"
            }
          />
        ),
    },
    {
      content: (
        <PaymentMethod
          dataBooking={dataBooking}
          dataBookingDetail={dataBookingDetail}
        />
      ),
      icon:
        loading && current === 2 ? (
          <Spin size="small" />
        ) : (
          <RiBankCardLine
            size={24}
            color={
              completedSteps.includes(2) || current === 2 ? "#4F28D9" : "#000"
            }
          />
        ),
    },
    {
      content: <DoneOrder />,
      icon:
        loading && current === 3 ? (
          <Spin size="small" />
        ) : (
          <RiCheckDoubleLine
            size={24}
            color={
              completedSteps.includes(3) || current === 3 ? "#4F28D9" : "#000"
            }
          />
        ),
    },
  ];

  const totalDestinationPrice = dataBookingDetail.reduce(
    (total: number, item: any) => {
      const cart = item.cart || {};
      const destinationPrice =
        (cart.quantityAdult * cart.destination?.priceAdult || 0) +
        (cart.quantityChildren * cart.destination?.priceChildren || 0);
      return total + destinationPrice;
    },
    0
  );

  const totalRoomPrice = dataBookingDetail.reduce(
    (total: number, item: any) => {
      const cart = item.cart || {};
      const roomPrice = cart.quantityRoom * cart.roomHotel?.price || 0;
      return total + roomPrice;
    },
    0
  );

  const totalPrice = totalDestinationPrice + totalRoomPrice;

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex justify-center">
          <Steps current={current} className="w-1/3">
            {steps.map((item, index) => (
              <Step key={index} icon={item.icon} />
            ))}
          </Steps>
        </div>

        <div className="w-full flex gap-5 pt-5">
          <div className="w-full">
            {/* Tampilkan konten langkah tanpa loading */}
            <div>{steps[current].content}</div>
          </div>

          <div className="w-1/3 bg-white rounded-xl sticky top-20  border-solid border-gray-200 border">
            <div
              className={`${mediumMontserrat.className} py-6 px-5 text-center`}
            >
              <span className={`text-lg font-semibold`}>Summary</span>
            </div>

            <div className="h-px bg-gray-300"></div>

            <div className="my-6 px-5 w-full flex-col flex gap-3">
              <div className="flex flex-col gap-3">
                <div
                  className={`${mediumMontserrat.className} flex justify-between items-center`}
                >
                  <span className="text-base font-semibold">
                    {dataBookingDetail.length} item
                  </span>
                  <span className="text-base font-semibold text-InfernoEcho-600">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>

                <div>
                  <div
                    className={`${mediumMontserrat.className} flex items-center gap-1`}
                  >
                    <RiGlassesLine className="text-RoyalAmethyst-700 text-2xl" />
                    <span className="text-RoyalAmethyst-700 text-base font-semibold">
                      Destination
                    </span>
                  </div>

                  {dataBookingDetail
                    .filter((item: any) => item?.cart?.destination)
                    .map(({ cart }: any, item: any) => {
                      return (
                        <>
                          <div
                            className={`${mediumMontserrat.className} flex gap-1 items-center pt-2`}
                          >
                            <span className="text-black text-base font-semibold">
                              {cart?.destination?.name}
                            </span>
                            <span className="text-sm">
                              ({cart?.destination?.city?.name},{" "}
                              {cart?.destination?.city?.province?.country?.name}
                              )
                            </span>
                          </div>
                          <div
                            className={`${mediumMontserrat.className} flex items-center gap-1 pt-1`}
                          >
                            <RiCalendarLine className="text-lg text-black" />
                            <span className="text-xs text-black">
                              {new Date(cart?.startDate).toLocaleDateString()} -
                              {new Date(cart?.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div
                            className={`${mediumMontserrat.className} flex gap-1 pt-1`}
                          >
                            <RiTeamLine className="text-black text-lg" />
                            <div className=" flex flex-col gap-1 w-full">
                              <span className="  text-sm font-semibold">
                                Guest :
                              </span>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold">
                                  {cart?.quantityAdult} adults
                                </span>
                                <span className="text-sm font-semibold">
                                  Rp{cart?.destination?.priceAdult}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold">
                                  {cart?.quantityChildren} child
                                </span>
                                <span className="text-sm font-semibold">
                                  Rp{cart?.destination?.priceChildren}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${mediumMontserrat.className} flex items-center justify-between pt-1`}
                          >
                            <span className="text-sm font-semibold">
                              Total Destination Price
                            </span>
                            <span className="text-sm font-semibold text-InfernoEcho-600">
                              {(cart?.quantityAdult *
                                cart?.destination?.priceAdult || 0) +
                                (cart?.quantityChildren *
                                  cart?.destination?.priceChildren || 0)}
                            </span>
                          </div>
                        </>
                      );
                    })}
                </div>
                <div>
                  <div
                    className={`${mediumMontserrat.className} flex items-center gap-1`}
                  >
                    <RiHome3Line className="text-RoyalAmethyst-700 text-2xl" />
                    <span className="text-RoyalAmethyst-700 text-base font-semibold">
                      Hotel
                    </span>
                  </div>

                  {dataBookingDetail
                    .filter((item: any) => item?.cart?.roomHotel)
                    .map(({ cart }: any, item: any) => {
                      return (
                        <>
                          <div
                            className={`${mediumMontserrat.className} flex gap-1 items-center pt-2`}
                          >
                            <span className="text-black text-base font-semibold">
                              {cart?.roomHotel?.hotel?.name}
                            </span>
                            <span className="text-sm">
                              ({cart?.roomHotel?.hotel?.city?.name},{" "}
                              {
                                cart?.roomHotel?.hotel?.city?.province?.country
                                  ?.name
                              }
                              )
                            </span>
                          </div>
                          <div
                            className={`${mediumMontserrat.className} flex gap-1 items-center pt-1 justify-between`}
                          >
                            <span className="text-black text-sm font-semibold">
                              {cart?.roomHotel?.roomType}
                            </span>
                            <span className="text-sm font-semibold">
                              X{cart?.quantityRoom}
                            </span>
                          </div>
                          <div
                            className={`${mediumMontserrat.className} flex items-center gap-1 pt-1`}
                          >
                            <RiCalendarLine className="text-lg text-black" />
                            <div className="flex gap-1 w-full justify-between">
                              <span className="text-xs text-black font-semibold">
                                {new Date(cart?.startDate).toLocaleDateString()}{" "}
                                - {new Date(cart?.endDate).toLocaleDateString()}
                              </span>
                              <span className="text-xs">
                                {(() => {
                                  const start = new Date(
                                    cart?.startDate
                                  ).getTime();
                                  const end = new Date(cart?.endDate).getTime();
                                  const days = Math.ceil(
                                    (end - start) / (1000 * 60 * 60 * 24)
                                  );
                                  return `(${days} day${days > 1 ? "s" : ""}, ${
                                    days - 1
                                  } night${days - 1 > 1 ? "s" : ""})`;
                                })()}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`${mediumMontserrat.className} flex gap-1 pt-1 items-center`}
                          >
                            <RiTeamLine className="text-black text-lg" />
                            <div className=" flex gap-1 w-full justify-between  items-center">
                              <span className="text-xs font-semibold">
                                {/* Room: {cart?.quantityRoom} */}
                                Guest : {cart?.roomHotel?.adult} adults,{" "}
                                {cart?.roomHotel?.children} child
                              </span>

                              <span className="text-sm font-semibold text-InfernoEcho-600">
                                {cart?.roomHotel?.price}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`${mediumMontserrat.className} flex items-center justify-between pt-1`}
                          >
                            <span className="text-sm font-semibold">
                              Total Room Price
                            </span>
                            <span className="text-sm font-semibold text-InfernoEcho-600">
                              {/* Rp2.555.000 */}
                              {cart?.quantityRoom * cart?.roomHotel?.price}
                            </span>
                          </div>
                          <div className={`${mediumMontserrat.className}  `}>
                            <span className="text-xs">
                              {cart?.quantityRoom} room (
                              {(() => {
                                const start = new Date(
                                  cart?.startDate
                                ).getTime();
                                const end = new Date(cart?.endDate).getTime();
                                const days = Math.ceil(
                                  (end - start) / (1000 * 60 * 60 * 24)
                                );
                                return `(${days} day${days > 1 ? "s" : ""}, ${
                                  days - 1
                                } night${days - 1 > 1 ? "s" : ""})`;
                              })()}
                              )
                            </span>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-300"></div>

            <div className="flex flex-col  px-5 py-4">
              <div
                className={`${mediumMontserrat.className} flex justify-between items-center `}
              >
                <span className="text-sm font-semibold">Booking Fees</span>
                <span className="text-sm text-RoyalAmethyst-700  font-semibold">
                  Free
                </span>
              </div>
              <div
                className={`${mediumMontserrat.className} flex justify-between items-center pt-1`}
              >
                <span className="text-sm font-semibold text-black">Total</span>
                <span className="text-sm text-InfernoEcho-600  font-semibold">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between w-full gap-3">
                  {current > 0 && current !== steps.length - 1 && (
                    <Button
                      onClick={prev}
                      className="w-full rounded-xl"
                      disabled={loading}
                    >
                      Previous
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <div
                      onClick={() => {
                        next();
                        if (current === steps.length - 2) {
                          router.push(redirectXendit || "");
                        }
                      }}
                      className="w-full bg-RoyalAmethyst-700 text-center py-2 text-white text-sm rounded-xl cursor-pointer"
                    >
                      <span>
                        {current === steps.length - 2 ? "Pay" : "Next"}{" "}
                      </span>
                    </div>
                  )}
                </div>

                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={finish}
                    className="bg-green-500 hover:bg-green-600"
                    disabled={loading}
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
