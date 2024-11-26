"use client";
import React, { useEffect, useState } from "react";
import { cardData } from "./news";
import Image from "next/image";
import { FileTextOutlined } from "@ant-design/icons"; // Ikon dari Ant Design
import Link from "next/link";
import Loading from "#/app/loading";
import { blogRepository } from "#/repository/blogs";

interface dataBlog {
  id: string;
  title: string;
  pathPhoto: string;
  createdAt: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function RelatedArticles({ data }:{
  data: dataBlog[] }) {
    if (!data || data.length === 0) {
      return <Loading />;
    }
    const [dataBlog, setDataBlog] = useState<any[]>([]);

    const fetchAllBlog = async () => {
      const res = await blogRepository.api.getBlogs();
      // console.log(res);
      setDataBlog(res.data);
    };
  
    useEffect(() => {
      fetchAllBlog();
    }, []);


  
    if (!dataBlog.length) {
      return <Loading />;
    }
  
    console.log("data:", dataBlog);
  
  return (
    <div className="pt-9">
      {/* Header Section */}
      <div className="flex items-center mb-5">
        <FileTextOutlined className="text-2xl mr-2 text-RoyalAmethyst-700" />
        <span className="text-xl font-semibold">
          You might enjoy reading this article.
        </span>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-3 gap-5">
      {dataBlog.sort(() => 0.5 - Math.random()).slice(0, 6).map((item: dataBlog) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border-solid border-gray-200 border overflow-hidden"
          >
            <div className="p-3 flex flex-col gap-2">
              <Link href={`/blog/list/detail/${item.id}`}>
                <Image
                  src={"/images/illustration/hawaii-beach.jpg"}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full rounded-xl"
                />
              </Link>

              <Link
                href={""}
                className="text-lg font-semibold text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline leading-6"
              >
                {item.title}
              </Link>
              <span className="text-sm text-gray-600 font-medium">
                  {`${formatDate(item.createdAt)}`}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function setFilteredData(dataBlog: any[]) {
  throw new Error("Function not implemented.");
}

function filterArticles(arg0: string) {
  throw new Error("Function not implemented.");
}

