"use client";
import DestinationDetail from "#/app/components/admin/destinationDetail";
import Loading from "#/app/loading";
import { Destination } from "#/app/types/Destinations";
import { destinationRepository } from "#/repository/destinations";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [destinationData, setDestinationData] = useState<Destination>();

  const fetchDestination = async () => {
    try {
      const res = await destinationRepository.api.getDestination(params.id);
      setDestinationData(res.body.data);
    } catch (error) {}
  };
  // console.log(destinationData);

  useEffect(() => {
    fetchDestination();
  }, []);

  if (!destinationData) {
    return <Loading />;
  }

  return (
    <div>
      <DestinationDetail destinationData={destinationData} />
    </div>
  );
}
