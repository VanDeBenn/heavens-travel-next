"use client";
import RefundDetail from "#/app/components/admin/refundDetail";
import { RefundRepository } from "#/repository/refund";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [dataRefund, setDataRefund] = useState<any>();

  const getRefund = async () => {
    const res = await RefundRepository.api.getRefund(params.id);
    setDataRefund(res.data);
  };

  useEffect(() => {
    getRefund();
  }, []);
  // // console.log("data refund: ", dataRefund);
  return (
    <div>
      <RefundDetail data={dataRefund} />
    </div>
  );
}
