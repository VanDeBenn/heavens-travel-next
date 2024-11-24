'use client'
import React, { useEffect, useState } from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import DestinasitionHighlights from "#/app/components/user/destinasitionHighlights";
import HotelHighlights from "#/app/components/user/hotelHighlights";
import MoreNews from "#/app/components/user/moreNews";
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
        <div className="flex gap-3">
          <a href="/" className="no-underline text-black font-medium">
            home
          </a>
          /
          <a href="/blog" className="no-underline text-black font-medium">
            blog
          </a>
          /
          <a href="/blog/list" className="no-underline text-black font-medium">
            list
          </a>
        </div>
        <div className="my-5 h-px bg-gray-300"></div>
        <DestinasitionHighlights data={dataBlog}  />
        <HotelHighlights data={dataBlog} />
        <MoreNews />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default page;
