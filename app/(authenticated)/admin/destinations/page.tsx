"use client";
import React, { useEffect, useState } from "react";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import ProfileLayout from "../layout";
import DestinationList from "#/app/components/admin/destinationList";
import { destinationRepository } from "#/repository/destinations";

interface PageProps {
  data: any;
}

const DestinationPage = () => {
  const [allDestinationsData, setAllDestinationsData] = useState<any[]>([]);

  const getAllUser = async () => {
    try {
      const res = await destinationRepository.api.getDestinations();
      setAllDestinationsData(res.body.data);
    } catch (error) {}
  };
  // console.log(allDestinationsData);

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <DestinationList data={allDestinationsData} />
    </div>
  );
};

export default DestinationPage;
