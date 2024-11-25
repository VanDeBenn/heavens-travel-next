import React from "react";
import { Button, Card } from "antd";
import { store } from "#/store";
import { sampleRepository } from "#/repository/sample";
import Banner from "#/app/components/user/banner";
import Header from "#/app/components/user/header";
import Footer from "#/app/components/user/footer";
import HolidayIntroduction from "#/app/components/user/holidayIntroduction";
import TopHotel from "#/app/components/user/TopHotel.1";
import UnforgettableExperience from "#/app/components/user/unforgettableExperience";
import ReadAndDiscover from "#/app/components/user/readAndDiscover";
import WhatInterestsYou from "#/app/components/user/whatInterestsYou";
import Faq from "#/app/components/user/faq";

const Page = () => {
  //   const { data, error, isLoading } = sampleRepository.hooks.useJoke();
  return (
    <div className="bg-Lilac-50 flex flex-col ">
      {/* <Header /> */}

      <div className="flex flex-col">
        <Banner />
        <div className="-mt-24">
          <div className="w-full">
            <div className="lg:pt-12 pt-6 w-full">
              <div className="relative flex flex-col bg-Lilac-50 w-full rounded-t-[35px]">
                <div className="px-28 2xl:px-48 py-16 flex flex-col gap-16">
                  <HolidayIntroduction />
                  <TopHotel />
                  <UnforgettableExperience />
                  <ReadAndDiscover />
                  <WhatInterestsYou />
                  <Faq />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* <div>
            home: {store.ui.title}
        </div>
        <div>
            fact: {data?.setup}
        </div>
        <Button className={"ml-8"} onClick={() => {
            store.ui.changeTitle("from home")
        }}>change title</Button> */}
    </div>
  );
};

export default Page;
