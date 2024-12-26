"use client";
import BannerDestinationList from "#/app/components/user/bannerDestinationList";
import Footer from "#/app/components/user/footer";
import HeaderComponent from "#/app/components/user/header";
import ResultDesti from "#/app/components/user/resultDesti";
import Loading from "#/app/loading";
import { destinationRepository } from "#/repository/destinations";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { slug: string } }) {
  const [destinationData, setDestinationData] = useState<any>();
  const pathname = usePathname();

  if (!pathname) {
    return <Loading />;
  }

  const pathSegments = pathname.split("/");
  const location = pathSegments[3].toLowerCase().replace(/-/g, " ");

  const capitalizeWords = (text: any) => {
    return text
      .split(" ")
      .map(
        (word: any) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const Location = capitalizeWords(location);
  console.log(Location);

  const getAllDestinations = async () => {
    const res = await destinationRepository.api.getDestinations();
    setDestinationData(res?.body?.data);
  };

  useEffect(() => {
    getAllDestinations();
  }, []);

  return (
    <div className="bg-Lilac-50 flex flex-col">
      <HeaderComponent />
      <BannerDestinationList data={destinationData} location={Location} />
      {/* <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-16">
      <ResultDesti />
    </div> */}
      <Footer />
    </div>
  );
}
