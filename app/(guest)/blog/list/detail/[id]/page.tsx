"use client";
import BlogDetail from "#/app/components/user/blogDetail";
import { blogRepository } from "#/repository/blogs";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [datablog, setDataBlog] = useState<any[]>([]);

  const fetchAllBlog = async () => {
    const res = await blogRepository.api.getBlogs();
    // console.log(res);
    setDataBlog(res.data);
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  console.log("data:", datablog);
  return (
    <>
      {/* <BlogDetail /> */}
      <div className="">
        {datablog.map((item: any) => (
          <div className="" key={item.id}>
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      {params.id}
    </>
  );
}
