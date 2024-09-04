import React from "react";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import BlogDetail from "../../../components/user/blogDetail";
import RelatedArticles from "#/app/components/user/RelatedArticles";

export default function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <Header />
      <div className=" px-16 pb-8 pt-24">
        <BlogDetail />
        <RelatedArticles />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
