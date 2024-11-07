import RoomDetail from "#/app/components/admin/roomDetail";
import Loading from "#/app/loading";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  router.push("/admin/hotels");
  return (
    <div>
      <Loading />
    </div>
  );
}
