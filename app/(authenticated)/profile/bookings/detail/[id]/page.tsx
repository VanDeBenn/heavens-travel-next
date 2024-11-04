"use client";
import DestinationDetail from "#/app/components/admin/destinationDetail";
import { destinationRepository } from "#/repository/destinations";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      <div>{params.id}</div>
    </>
  );
}
