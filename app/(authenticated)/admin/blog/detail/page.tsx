"use client";
import BlogDetail from "#/app/components/admin/blogDetail";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  router.push("/admin/blog");
  return (
    <>
      <div>{/* <BlogDetail /> */}</div>
    </>
  );
}
