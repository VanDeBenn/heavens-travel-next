import React from "react";
import Footer from "#/app/components/user/footer";
import HighlightBlog from "#/app/components/user/highlightBlog";
import News from "#/app/components/user/news";
import NewsHighlight from "#/app/components/user/newsHighlight";
import Header from "#/app/components/user/header";
import PopularNews from "#/app/components/user/popularNews";
import BlogDetail from "#/app/components/user/blogDetail";

function page() {
  return (
    <main className="bg-Lilac-50">
      <Header />
      <div className=" px-16 pb-8 pt-24">
        <HighlightBlog />
        <News />
        <NewsHighlight />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default page;
