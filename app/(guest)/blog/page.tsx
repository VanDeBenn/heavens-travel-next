'use client'
import React, { useEffect, useState } from "react";
import Footer from "#/app/components/user/footer";
import HighlightBlog from "#/app/components/user/highlightBlog";
import News from "#/app/components/user/news";
import NewsHighlight from "#/app/components/user/newsHighlight";
import Header from "#/app/components/user/header";
import PopularNews from "#/app/components/user/popularNews";
import BlogDetail from "#/app/components/user/blogDetail";
import { blogRepository } from "#/repository/blogs";

function page() {
  const [dataBlog, setDataBlog] = useState<any[]>([]);

  const fetchAllBlog = async () => {
    const res = await blogRepository.api.getBlogs();
    // console.log(res);
    setDataBlog(res.data);
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  console.log("data:", dataBlog);

  return (
    <div>
      <main className="bg-Lilac-50">
        <Header />
        <div className=" px-16 pb-8 pt-24">
          <HighlightBlog  />
          <News data={dataBlog} />
          <NewsHighlight />
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default page;
