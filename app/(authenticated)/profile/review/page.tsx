import React from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import Review from "#/app/components/user/review";
function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <Header />
      <div className=" px-16 pb-8 pt-24">
        <Review />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default page;
