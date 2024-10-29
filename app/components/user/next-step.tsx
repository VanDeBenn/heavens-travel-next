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
import form from "antd/es/form";
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

const { Step } = Steps;

export default function NextStep() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dataBookingDetail, setdataBookingDetail] = useState<any[]>([]);
  const [dataBooking, setdataBooking] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any>();
  const [submitForms, setSubmitForms] = useState(false);

  const bookingId = localStorage.getItem("_booking");
  const getBooking = async () => {
    try {
      const res = await bookingRepository.api.getBooking(bookingId || "");
      setdataBooking(res.data);
      setdataBookingDetail(res.data.bookingdetails);
      setDataUser(res.data.user);
    } catch (error) {}
  };

  useEffect(() => {
    getBooking();
  }, []);

  //  // console.log("data booking:", dataBooking);

  const next = () => {
    setLoading(true);
    setTimeout(() => {
      setCompletedSteps([...completedSteps, current]); // Tambahkan langkah saat ini ke daftar langkah yang selesai
      setCurrent(current + 1);
      setLoading(false);
    }, 2000);
    setSubmitForms(true);
  };

  const prev = () => {
    setLoading(true);
    setTimeout(() => {
      setCompletedSteps(completedSteps.filter((step) => step !== current - 1)); // Hapus langkah yang dikembalikan dari daftar yang selesai
      setCurrent(current - 1);
      setLoading(false);
    }, 1200);
  };

  const finish = () => {
    message.success("All steps completed!");
  };

  const steps = [
    {
      content: (
        <YourBooking
          dataBookingDetail={dataBookingDetail}
          setSubmit={setSubmitForms}
        />
      ),
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
      content: (
        <GuestForm
          dataUser={dataUser}
          next={next}
          submit={submitForms}
          setSubmit={setSubmitForms}
        />
      ),
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
          setSubmit={setSubmitForms}
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
                    Rp1.299.000
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

                  {dataBookingDetail.map(({ cart }: any, item: any) => (
                    <>
                      <div
                        className={`${mediumMontserrat.className} flex gap-1 items-center pt-2`}
                      >
                        <span className="text-black text-base font-semibold">
                          {cart?.destination.name}
                        </span>
                        <span className="text-sm">(Bali, indonesian)</span>
                      </div>
                      <div
                        className={`${mediumMontserrat.className} flex items-center gap-1 pt-1`}
                      >
                        <RiCalendarLine className="text-lg text-black" />
                        <span className="text-xs text-black">
                          {" "}
                          {cart?.startDate}
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
                              Rp{cart?.destination.priceAdult}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold">
                              {cart?.quantityChildren} child
                            </span>
                            <span className="text-sm font-semibold">
                              Rp{cart?.destination.priceChildren}
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
                            cart?.destination.priceAdult || 0) +
                            (cart?.quantityChildren *
                              cart?.destination.priceChildren || 0)}
                        </span>
                      </div>
                    </>
                  ))}
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

                  <div
                    className={`${mediumMontserrat.className} flex gap-1 items-center pt-2`}
                  >
                    <span className="text-black text-base font-semibold">
                      {/* Mandarin Oriental */}
                    </span>
                    <span className="text-sm">{/* (Bali, indonesian) */}</span>
                  </div>
                  <div
                    className={`${mediumMontserrat.className} flex gap-1 items-center pt-1 justify-between`}
                  >
                    <span className="text-black text-sm font-semibold">
                      {/* Deluxe Double Room F */}
                    </span>
                    <span className="text-sm font-semibold">{/* X2 */}</span>
                  </div>

                  <div
                    className={`${mediumMontserrat.className} flex items-center gap-1 pt-1`}
                  >
                    {/* <RiCalendarLine className="text-lg text-black" /> */}
                    <div className=" flex gap-1 w-full justify-between">
                      <span className="text-xs text-black font-semibold">
                        {/* 26 Nov, 2024 - 29 Nov, 2024 */}
                      </span>
                      <span className="text-xs">{/* (3 day, 2 night) */}</span>
                    </div>
                  </div>

                  <div
                    className={`${mediumMontserrat.className} flex gap-1 pt-1 items-center`}
                  >
                    {/* <RiTeamLine className="text-black text-lg" /> */}
                    <div className=" flex gap-1 w-full justify-between  items-center">
                      <span className="text-xs font-semibold">
                        {/* Guest : 2 adults, 3 child */}
                      </span>

                      <span className="text-sm font-semibold text-InfernoEcho-600">
                        {/* Rp2.555.000 */}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`${mediumMontserrat.className} flex items-center justify-between pt-1`}
                  >
                    <span className="text-sm font-semibold">
                      {/* Total Room Price */}
                    </span>
                    <span className="text-sm font-semibold text-InfernoEcho-600">
                      {/* Rp2.555.000 */}
                    </span>
                  </div>
                  <div className={`${mediumMontserrat.className}  `}>
                    <span className="text-xs">
                      {/* 2 room (3 day, 2 night) */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-300"></div>

            <div className="flex flex-col  px-5 py-4">
              <div
                className={`${mediumMontserrat.className} flex justify-between items-center `}
              >
                <span className="text-sm font-semibold">
                  {/* Booking Fees */}
                </span>
                <span className="text-sm text-RoyalAmethyst-700  font-semibold">
                  {/* Free */}
                </span>
              </div>
              <div
                className={`${mediumMontserrat.className} flex justify-between items-center pt-1`}
              >
                <span className="text-sm font-semibold text-black">Total</span>
                <span className="text-sm text-InfernoEcho-600  font-semibold">
                  Rp12.344.000
                </span>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between w-full gap-3">
                  {current > 0 && (
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
                      onClick={next}
                      className="w-full bg-RoyalAmethyst-700 text-center py-2 text-white text-sm rounded-xl cursor-pointer"
                    >
                      <span>Next</span>
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
