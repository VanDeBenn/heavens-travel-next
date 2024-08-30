import React from "react";
import Footer from "../components/user/footer";
import HighlightBlog from "../components/user/highlightBlog";
import News from "../components/user/news";
import NewsHighlight from "../components/user/newsHighlight";

function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <div className=" px-16 py-8">
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
