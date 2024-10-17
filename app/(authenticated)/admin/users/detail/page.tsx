"use client";
import React from "react";
import UserDetail from "#/app/components/admin/userDetail";
import Loading from "#/app/loading";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  router.push("/admin/users");
  return <Loading />;
}
