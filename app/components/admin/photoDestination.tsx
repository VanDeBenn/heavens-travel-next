"use client";

import React, { useEffect, useState } from "react";
import { Upload, message, Button } from "antd";
import { RiCamera2Line } from "react-icons/ri";
import type { RcFile } from "antd/es/upload/interface";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { destinationRepository } from "#/repository/destinations";
import { useRouter } from "next/navigation";
import Loading from "#/app/loading";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface PhotoDestinationProps {
  setPhotoData: any;
  destinationId: string;
  submitPhotoForm: boolean;
  // finish: () => void;
  // destinationId: string;
}

export default function PhotoDestination({
  destinationId,
  setPhotoData,
  submitPhotoForm,
}: PhotoDestinationProps) {
  const router = useRouter();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUploadSingleFile = async (
    file: RcFile,
    destinationId: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const destId = destinationId
      ? destinationId
      : localStorage.getItem("_destination") || "";
    formData.append("destinationId", destId);

    try {
      setUploading(true);
      await destinationRepository.api.addPhotoDestination(formData);
      message.success(`File ${file.name} uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error(`Failed to upload ${file.name}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadAllFiles = async () => {
    if (fileList.length === 0) {
      message.error("Please add at least one file.");
      return;
    }

    for (const file of fileList) {
      await handleUploadSingleFile(file, destinationId);
    }
    message.success("All files uploaded successfully.");
  };

  const handleBeforeUpload = (file: RcFile) => {
    if (fileList.length >= 4) {
      message.error("You can only upload up to 4 photos.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) =>
      setPreviewImages((prev) => [...prev, e.target?.result as string]);
    reader.readAsDataURL(file);

    setFileList((prev) => [...prev, file]);
    return false;
  };

  const handleRemove = (file: RcFile) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);

    const updatedPreviewImages = previewImages.filter(
      (_, index) => index !== fileList.indexOf(file)
    );
    setPreviewImages(updatedPreviewImages);
  };

  useEffect(() => {
    if (destinationId) {
      handleUploadAllFiles();
    }
  }, [destinationId]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-9">
      <div className={`${mediumMontserrat.className} pb-4`}>
        <span className="text-lg font-semibold">Photos</span>
      </div>

      <div className="flex flex-col gap-5">
        <div className={`${mediumMontserrat.className} `}>
          <p className="text-sm font-semibold">Add photo</p>
          <div
            className={`${mediumMontserrat.className} flex flex-col items-center justify-center border border-gray-200 rounded-lg p-6 h-36 cursor-pointer`}
          >
            <Upload
              beforeUpload={handleBeforeUpload}
              onRemove={(file) => handleRemove(file as RcFile)}
              showUploadList={false}
              className="w-full flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <RiCamera2Line size={30} className="text-gray-500" />
                <span className="text-gray-500 mt-2">Click to add photo</span>
              </div>
            </Upload>
          </div>
        </div>

        {/* Preview uploaded images */}
        <div className="grid grid-cols-4 gap-5">
          {previewImages.map((image, index) => (
            <div key={index} className="relative w-full h-40 overflow-hidden">
              <Image
                src={image}
                alt={`Uploaded photo ${index + 1}`}
                width={128}
                height={249}
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

        {/* <Button
          type="primary"
          onClick={handleUploadAllFiles}
          loading={uploading}
          disabled={fileList.length === 0}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </Button> */}
      </div>

      {/* <div className="flex justify-end mt-4">
        <Button
          type="primary"
          onClick={() => {
            // finish();

            setTimeout(() => {
              handleUploadAllFiles();
              router.push("/admin/destinations/create/result");
            }, 1000);
          }}
          className="bg-RoyalAmethyst-700 w-32 text-white rounded-xl"
        >
          Done
        </Button>
      </div> */}
    </div>
  );
}
