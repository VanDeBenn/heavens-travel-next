import React from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import BlogDetail from "#/app/components/user/blogDetail";
import RelatedArticles from "#/app/components/user/RelatedArticles";

export default function page() {
  return (
    <main className="bg-Lilac-50">
      <Header />
      <div className=" px-16 pb-8 pt-24">
        <BlogDetail data={undefined} />
        <RelatedArticles />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
