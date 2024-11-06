"use client";
import BlogList from "#/app/components/admin/blogList";
import { blogRepository } from "#/repository/blogs";
import React, { useEffect, useState } from "react";

export default function page() {
  const [blogsData, setBlogsData] = useState();

  const getAllBlogs = async () => {
    try {
      const res = await blogRepository.api.getBlogs();
      setBlogsData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <BlogList data={blogsData} />
    </div>
  );
}
