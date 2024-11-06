"use client";
import ReportDetail from "#/app/components/admin/reportDetail";
import Loading from "#/app/loading";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  router.push("/admin/report");
  return (
    <div>
      <Loading />
    </div>
  );
}
