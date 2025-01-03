import Sidebar from "#/app/components/admin/sidebar";
import { ReactNode } from "react";
import Head from "next/head";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section
        className={`flex flex-col lg:flex-row min-h-screen bg-Lilac-50 `}
      >
        <div className=" lg:flex h-full lg:sticky top-0">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full overflow-hidden px-5 py-8">
          {children}
        </div>
      </section>
    </>
  );
}
