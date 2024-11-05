"use client";
import BlogDetail from "#/app/components/user/blogDetail";
import { blogRepository } from "#/repository/blogs";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [dataBlog, setDataBlog] = useState<any>();

  const getBlog = async () => {
    const res = await blogRepository.api.getBlog(params.id);
    setDataBlog(res.data);
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <BlogDetail data={dataBlog} />
    </>
  );
}
