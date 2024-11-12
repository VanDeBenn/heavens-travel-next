"use client";
import BlogDetail from "#/app/components/user/blogDetail";
import Header from "#/app/components/user/header";
import RelatedArticles from "#/app/components/user/RelatedArticles";
import { blogRepository } from "#/repository/blogs";
import { Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [datablog, setDataBlog] = useState<any[]>([]);

  const fetchAllBlog = async () => {
    const res = await blogRepository.api.getBlog(params.id);
    // console.log(res);
    setDataBlog(res.data);
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  // console.log("data:", datablog);
  return (
    <>
      <main className="bg-Lilac-50">
        <Header />
        <div className=" px-16 pb-8 pt-24">
          <BlogDetail data={datablog} />
          <RelatedArticles />
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </>
  );
}
