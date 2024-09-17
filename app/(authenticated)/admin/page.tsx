import ProfileLayout from "#/app/components/admin/ProfileLayout";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import DestinationList from "#/app/components/admin/destinationList";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import Sidebar from "#/app/components/admin/sidebar";

const ProfilePage: React.FC = () => {
  return (
    <ProfileLayout>
      <div className="flex flex-col gap-4 w-full ">
        <InformationAdmin id={""} data={undefined} />
        <ChangePasswordAdmin id={""} data={undefined} />
        <DestinationList />
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;

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
