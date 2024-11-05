"use client";
import BlogList from "#/app/components/admin/blogList";
import { blogRepository } from "#/repository/blogs";
import React, { useEffect, useState } from "react";

export default function page() {
  const [dataBlogs, setDataBlogs] = useState();

  const getAllBlog = async () => {
    try {
      const res = await blogRepository.api.getBlogs();
      setDataBlogs(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllBlog();
  }, []);
  return (
    <div>
      <BlogList data={dataBlogs} />
    </div>
  );
}
