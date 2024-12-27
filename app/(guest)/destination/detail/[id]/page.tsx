"use client";
import NewsFrom from "#/app/components/user/newsFrom";
import BannerViewDesti from "#/app/components/user/bannerViewDesti";
import DescriptionDesti from "#/app/components/user/descriptionDesti";
import Footer from "#/app/components/user/footer";
import GuestReviewDesti from "#/app/components/user/guestReviewDesti";
import HeaderComponent from "#/app/components/user/header";
import TicketsOverview from "#/app/components/user/ticketsOverview";
import TopFourHotel from "#/app/components/user/topFourHotel";
import OtherRecommendedCities from "#/app/components/user/otherRecommendedCities";
import Faq from "#/app/components/user/faq";
import React, { useEffect, useReducer, useRef, useState } from "react";
import InstagrammableHotels from "#/app/components/user/instagrammableHotels";
import { destinationRepository } from "#/repository/destinations";
import { blogRepository } from "#/repository/blogs";
import Loading from "#/app/loading";

function page({ params }: { params: { id: string } }) {
  const [dataDestination, setDataDestinations] = useState<any>();
  const [x, setx] = useState<any>();
  const chooseRoomRef = useRef<HTMLDivElement>(null);

  const fetchAllDestination = async () => {
    try {
      const res = await destinationRepository.api.getDestination(params.id);
      // console.log(res.body.data);
      setDataDestinations(res.body.data);
      setx(res.body.blog.name);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllDestination();
  }, []);

  const scrollToChooseRoom = () => {
    if (chooseRoomRef.current) {
      chooseRoomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // console.log("data:", dataDestination);

  // const [datablog, setDataBlog] = useState<any[]>([]);

  // const fetchAllBlog = async () => {
  //   const res = await blogRepository.api.getBlogs();
  //   // console.log(res);
  //   setDataBlog(res.data);
  // };

  // useEffect(() => {
  //   fetchAllBlog();
  // }, []);

  // console.log("data:", dataBlog);

  if (!dataDestination) {
    return <Loading />;
  }

  return (
    <div className="bg-Lilac-50">
      <HeaderComponent />
      <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-5 pt-20">
        <BannerViewDesti
          scrollToChooseRoom={scrollToChooseRoom}
          data={dataDestination}
        />
        <DescriptionDesti data={dataDestination} />
        <TicketsOverview data={dataDestination} />
        <GuestReviewDesti data={dataDestination}/>
        <NewsFrom data={dataDestination} />
        <InstagrammableHotels data={dataDestination} />
        <TopFourHotel data={dataDestination} />
        <OtherRecommendedCities />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}

export default page;
