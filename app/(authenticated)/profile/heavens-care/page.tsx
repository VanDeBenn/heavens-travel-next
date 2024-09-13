import React from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";

import HeavensCare from "#/app/components/user/heavensCare";
function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <div>
        <Header />
      </div>

      <div className=" px-16 pb-8 pt-24">
        <HeavensCare />
      </div>
      
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default page;
