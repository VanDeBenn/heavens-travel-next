import RefundDetail from "#/app/components/admin/refundDetail";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  router.push("/admin/refund");
  return <div className=""></div>;
}
