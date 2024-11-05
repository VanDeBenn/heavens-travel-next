// "use client";

// import React, { useState } from "react";
// import { Upload, message, Button } from "antd"; // Tambahkan Button dari Ant Design
// import { RiCamera2Line } from "react-icons/ri";
// import type { RcFile } from "antd/es/upload/interface";
// import { Montserrat } from "next/font/google";
// import Image from "next/image";
// import { destinationRepository } from "#/repository/destinations";

// const mediumMontserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["500"],
// });

// const PhotoDestination: React.FC = () => {
//   const [fileList, setFileList] = useState<RcFile[]>([]); // State untuk menyimpan daftar file
//   const [previewImages, setPreviewImages] = useState<string[]>([]); // State untuk menyimpan preview gambar
//   const [uploading, setUploading] = useState(false); // State untuk menunjukkan progress upload

//   // Fungsi untuk mengupload satu file pada satu waktu
//   const handleUploadSingleFile = async (file: RcFile) => {
//     const formData = new FormData(); // Membuat FormData untuk mengirim file sebagai multipart data
//     formData.append("file", file); // Menambahkan file ke form data

//     // Menambahkan destinationId default
//     formData.append("destinationId", "ba9fae15-3110-47a6-abff-00ecdaf23075"); // ID destination yang ingin ditambahkan

//     try {
//       setUploading(true); // Mengubah status uploading menjadi true saat proses upload dimulai
//       const response = await destinationRepository.api.addPhotoDestination(
//         formData
//       ); // Menggunakan repository untuk melakukan POST request
//       message.success(`File ${file.name} uploaded successfully!`); // Pesan sukses saat file berhasil diupload
//        // console.log("Response:", response); // Logging response dari server
//     } catch (error) {
//       console.error("Error uploading file:", error); // Logging jika terjadi error
//       message.error(`Failed to upload ${file.name}`); // Pesan error saat file gagal diupload
//     }
//   };

//   // Fungsi untuk mengupload semua file yang ada dalam fileList satu per satu
//   const handleUploadAllFiles = async () => {
//     if (fileList.length === 0) {
//       message.error("Please add at least one file."); // Pesan error jika tidak ada file untuk diupload
//       return;
//     }

//     for (const file of fileList) {
//       await handleUploadSingleFile(file); // Upload setiap file secara individual
//     }

//     setUploading(false); // Upload selesai, mengubah status uploading menjadi false
//     message.success("All files uploaded successfully."); // Pesan sukses jika semua file berhasil diupload
//   };

//   // Fungsi untuk menangani file sebelum diupload (menampilkan preview)
//   const handleBeforeUpload = (file: RcFile) => {
//     if (fileList.length >= 4) {
//       // Batas maksimum 4 file
//       message.error("You can only upload up to 4 photos."); // Pesan error jika melebihi batas
//       return false;
//     }

//     const reader = new FileReader(); // Menggunakan FileReader untuk membaca file
//     reader.onload = (e) => {
//       setPreviewImages((prevImages) => [
//         ...prevImages,
//         e.target?.result as string,
//       ]); // Menyimpan hasil preview ke state previewImages
//     };
//     reader.readAsDataURL(file); // Membaca file sebagai data URL (untuk menampilkan preview)

//     setFileList((prevList) => [...prevList, file]); // Menambahkan file ke dalam fileList
//     return false; // Menghentikan default behavior dari Ant Design agar tidak langsung mengupload
//   };

//   // Fungsi untuk menghapus file dari fileList
//   const handleRemove = (file: RcFile) => {
//     const updatedFileList = fileList.filter((item) => item.uid !== file.uid); // Menghapus file yang dipilih
//     setFileList(updatedFileList);

//     const updatedPreviewImages = previewImages.filter(
//       (_, index) => index !== fileList.indexOf(file)
//     ); // Menghapus preview dari file yang dihapus
//     setPreviewImages(updatedPreviewImages);
//   };

//    // console.log("file list", fileList);
//    // console.log("preview", previewImages);
//    // console.log("uploading", uploading);
//   return (
//     <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
//       <div className={`${mediumMontserrat.className} pb-4`}>
//         <span className="text-lg font-semibold">Photos</span>
//       </div>
//       <div className="flex flex-col gap-5">
//         <div>
//           <p className="text-sm font-semibold">Add photo</p>
//           <div
//             className={`${mediumMontserrat.className} items-center justify-center flex flex-col gap-1 w-full border border-solid border-gray-200 rounded-lg p-6 h-36 cursor-pointer`}
//           >
//             <Upload
//               beforeUpload={(file) => handleBeforeUpload(file as RcFile)} // Fungsi untuk menangani file sebelum diupload
//               onRemove={(file) => handleRemove(file as RcFile)} // Fungsi untuk menghapus file dari daftar
//               fileList={fileList as any} // Mengikat fileList ke Upload component
//               showUploadList={false} // Tidak menampilkan default upload list dari Ant Design
//               className="w-full flex flex-col items-center justify-center"
//             >
//               <div className="flex flex-col items-center justify-center text-center">
//                 <RiCamera2Line size={30} className="text-gray-500" />
//                 <span className="text-gray-500 mt-2">Click to add photo</span>
//               </div>
//             </Upload>
//           </div>
//         </div>

//         {/* Preview untuk setiap gambar yang diupload */}
//         <div className="grid grid-cols-4 gap-5">
//           {previewImages.map((image, index) => (
//             <div key={index} className="relative w-full h-40 overflow-hidden">
//               <Image
//                 src={image}
//                 alt={`Uploaded photo ${index + 1}`}
//                 width={128} // Sesuaikan width sesuai kebutuhan
//                 height={249} // Sesuaikan height sesuai kebutuhan
//                 className="rounded-lg object-cover w-full h-full"
//               />
//               <div
//                 className="absolute top-0 right-0 p-1 cursor-pointer bg-red-500 text-white rounded-full"
//                 onClick={() => handleRemove(fileList[index])} // Menghapus file saat user menekan tombol 'X'
//               >
//                 &times;
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tombol untuk mengupload semua file */}
//         <Button
//           type="primary"
//           onClick={handleUploadAllFiles} // Mengupload semua file satu per satu
//           loading={uploading} // Menampilkan loading state jika sedang uploading
//           disabled={fileList.length === 0} // Menonaktifkan tombol jika tidak ada file yang diupload
//         >
//           {uploading ? "Uploading..." : "Upload Files"}
//           {/* Menampilkan teks sesuai status uploading */}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PhotoDestination;

// import React from "react";
// import Image from "next/image";

// export default function page() {
//   return (
//     <>
//       <div>page</div>
//       <Image
//         src={
//           "http://localhost:3222/photo-destinations/upload/b17e1047-4868-4a2b-b75e-faedbfe7557d.png"
//         }
//         alt={"image"}
//         width={500}
//         height={500}
//       ></Image>
//     </>
//   );
// }

import React from "react";
import RoomList from "../components/admin/roomList";
import RoomHotelDetail from "../components/admin/roomHotelDetail";
import CreateInfoRoom from "../components/admin/createInfoRoom";
import PhotoRoomHotel from "../components/admin/photoRoomHotel";
import FacilityRoom from "../components/admin/facilityRoom";
import ResultRoom from "../components/admin/resultRoom";
import BlogList from "../components/admin/blogList";
import BlogDetail from "../components/admin/blogDetail";
import CreateBlogInfo from "../components/admin/createBlogInfo";
import BookingList from "../components/admin/bookingList";
import BookingDetail from "../components/admin/bookingDetail";
import RefundList from "../components/admin/refundList";
import RefundDetail from "../components/admin/refundDetail";
import ReportList from "../components/admin/reportList";
import ReportDetail from "../components/admin/reportDetail";
import ReviewList from "../components/admin/reviewList";
import Banner from "../components/user/banner";
import WhatInterestsYou from "../components/user/whatInterestsYou";
import Faq from "../components/user/faq";

export default function page() {
  return (
    <div className="bg-Lilac-50 px-28 2xl:px-48 py-14 flex flex-col gap-4">
      {/* <BlogList /> */}
      {/* <ResultRoom /> */}
      {/* <BlogDetail /> */}
      {/* <CreateBlogInfo /> */}

      {/* <BookingList /> */}
      {/* <BookingDetail /> */}

      {/* <RefundList /> */}
      {/* <RefundDetail /> */}
      {/* <ReportList /> */}

      {/* <ReviewList /> */}
      {/* <Banner /> */}

      {/* <WhatInterestsYou /> */}
      {/* <Faq /> */}
    </div>
  );
}
