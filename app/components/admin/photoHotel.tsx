"use client";

import React, { useState } from "react";
import { Upload, message } from "antd";
import { RiCamera2Line } from "react-icons/ri";
import type { RcFile } from "antd/es/upload/interface";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const PhotoHotel: React.FC = () => {
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleRemove = (file: RcFile) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);

    const updatedPreviewImages = previewImages.filter(
      (_, index) => index !== fileList.indexOf(file)
    );
    setPreviewImages(updatedPreviewImages);
  };

  const handleBeforeUpload = (file: RcFile) => {
    if (fileList.length >= 4) {
      message.error("You can only upload up to 4 photos.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImages((prevImages) => [
        ...prevImages,
        e.target?.result as string,
      ]);
    };
    reader.readAsDataURL(file);

    setFileList((prevList) => [...prevList, file]);
    return false;
  };

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-4`}>
        <span className="text-lg font-semibold">Hotel Photo</span>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold">Add photo</p>
          <div
            className={`${mediumMontserrat.className} items-center justify-center  flex flex-col gap-1 w-full border border-solid border-gray-200 rounded-lg p-6 h-36 cursor-pointer`}
          >
            <div>
              <Upload
                beforeUpload={(file) => handleBeforeUpload(file as RcFile)}
                onRemove={(file) => handleRemove(file as RcFile)}
                fileList={fileList as any}
                showUploadList={false}
                className="w-full"
              >
                <div className="flex flex-col items-center justify-center ">
                  <RiCamera2Line size={30} className="text-gray-500" />
                  <span className="text-gray-500 mt-2">Click to add photo</span>
                </div>
              </Upload>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {previewImages.map((image, index) => (
            <div key={index} className="relative w-full h-40 overflow-hidden">
              <Image
                src={image}
                alt={`Uploaded photo ${index + 1}`}
                width={128} // set width according to your needs
                height={249} // set height according to your needs
                className="rounded-lg object-cover w-full h-full"
              />
              <div
                className="absolute top-0 right-0 p-1 cursor-pointer bg-red-500 text-white rounded-full"
                onClick={() => handleRemove(fileList[index])}
              >
                &times;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoHotel;
