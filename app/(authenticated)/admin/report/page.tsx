"use client";
import ReportList from "#/app/components/admin/reportList";
import { reportRepository } from "#/repository/report";
import React, { useEffect, useState } from "react";

export default function page() {
  const [reportsData, setReportsData] = useState<any>();

  const getAllReports = async () => {
    const res = await reportRepository.api.getReports();
    setReportsData(res.data);
  };

  useEffect(() => {
    getAllReports();
  }, []);

  console.log(reportsData);
  return (
    <div>
      <ReportList data={reportsData} />
    </div>
  );
}
