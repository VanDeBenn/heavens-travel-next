"use client";
import Loading from "#/app/loading";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  router.push("/admin/destinations");
  return <Loading />;
}
