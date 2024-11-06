"use client";
import ReportDetail from "#/app/components/admin/reportDetail";
import { reportRepository } from "#/repository/report";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [reportData, setReportData] = useState<any>();

  const getReport = async () => {
    const res = await reportRepository.api.getReport(params.id);
    setReportData(res.data);
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <>
      <ReportDetail data={reportData} />
    </>
  );
}
