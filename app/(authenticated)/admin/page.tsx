// import ProfileLayout from "#/app/components/admin/ProfileLayout";
// import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
// import DestinationList from "#/app/components/admin/destinationList";
// import InformationAdmin from "#/app/components/admin/informationAdmin";
// import Sidebar from "#/app/components/admin/sidebar";
// import UserDetail from "#/app/components/admin/userDetail";

// const ProfilePage: React.FC = () => {
//   return (
//     <ProfileLayout>
//       <div className="flex flex-col gap-4 w-full ">
//         {/* <InformationAdmin id={""} data={undefined} />
//         <ChangePasswordAdmin id={""} data={undefined} /> */}
//         <DestinationList />
//         <UserDetail />
//       </div>
//     </ProfileLayout>
//   );
// };

// export default ProfilePage;

"use client";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "#/app/components/admin/sidebar";
import DestinationList from "#/app/components/admin/destinationList";
import InformationAdmin from "#/app/components/admin/informationAdmin";

const Page: React.FC = () => {
  return (
    <Router>
      <div className={`flex flex-col lg:flex-row min-h-screen bg-[#F8F8FF] `}>
        <div className="hidden lg:flex h-full lg:sticky top-0">
          <Sidebar />
        </div>
        <div  className="flex flex-col w-full overflow-hidden px-5 py-8">
          <Routes>
            <Route path="/admin/destination" element={<DestinationList />} />
            <Route
              path="/admin/information"
              element={<InformationAdmin id={""} data={undefined} />}
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin/information" replace />}
            />
            <Route
              path="/"
              element={<Navigate to="/admin/information" replace />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Page;
// import React, { useState } from "react";
// import Sidebar from "#/app/components/admin/sidebar";
// import Content from "#/app/components/admin/content";

// const Page: React.FC = () => {
//   const [activeMenu, setActiveMenu] = useState<string>("DestinationList");

//   const handleMenuClick = (menu: string) => {
//     setActiveMenu(menu);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar onMenuClick={handleMenuClick} />
//       <Content activeMenu={activeMenu} />
//     </div>
//   );
// };

// export default Page;

// Di halaman admin.tsx

// "use client"

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// const DashboardPage = () => {
//   const session = useSession();
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     if (session.data?.user?.role) {
//       setRole(session.data.user.role);
//     }
//   }, [session.data]);

//   if (session.status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (session.status === 'unauthenticated') {
//     return <p>You must be logged in to view this page.</p>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {/* Conditional rendering based on user role */}
//       {role === 'admin' && (
//         <>
//           <p>Welcome, Admin!</p>
//           <button className="btn-create">Create</button>
//           {/* Other admin-specific features */}
//         </>
//       )}

//       {role === 'user' && (
//         <>
//           <p>Welcome, User!</p>
//           {/* Other user-specific features */}
//         </>
//       )}

//       {role !== 'admin' && role !== 'user' && (
//         <p>Your role is not recognized. Please contact support.</p>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;

// /* <div className="bg-[#F8F8FF]">
//       <div>
//       <Sidebar />
//     </div>
//     </div> */

// /* <section
//       className={` flex flex-col lg:flex-row gap-5 px-6 md:px-12 lg:px-24 bg-selago-50 dark:bg-gray-900 min-h-screen py-10`}
//     >
//       <div className="hidden lg:flex h-full lg:sticky top-0">
//         <Sidebar />
//       </div>

//       <div className="flex flex-col w-full lg:w-4/5 overflow-hidden">
//         {children}
//       </div>
//     </section> */
