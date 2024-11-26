"use client";
import React, { useEffect, useState } from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import BlogDetail from "#/app/components/user/blogDetail";
import RelatedArticles from "#/app/components/user/RelatedArticles";
import { blogRepository } from "#/repository/blogs";

function page() {
  const [dataBlog, setDataBlog] = useState<any[]>
  ([]);

  const fetchAllBlog = async () => {
    const res = await blogRepository.api.getBlogs();
    //console.log(res);
    setDataBlog(res.data);
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  return (
    <main className="bg-Lilac-50">
      <Header />
      <div className=" px-16 pb-8 pt-24">
        <BlogDetail data={dataBlog} />
        <RelatedArticles data={dataBlog} />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default page;
