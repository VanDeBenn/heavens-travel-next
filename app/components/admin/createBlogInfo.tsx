"use client";

import React, { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { Montserrat } from "next/font/google";
import { RiCamera2Line } from "react-icons/ri";
import type { RcFile } from "antd/es/upload/interface";
import Image from "next/image";
import Link from "next/link";
import { blogRepository } from "#/repository/blogs";

const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const CreateBlogInfo: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const userId = localStorage.getItem("_id");

  const onFinish = async (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload a photo!");
      return;
    }

    const photodata = new FormData();
    photodata.append("file", fileList[0]);

    try {
      const formData = new FormData();
      formData.append("title", values.blogTitle);
      formData.append("description", values.description);
      formData.append("userId", userId || "");
      formData.append("pathPhoto", "");
      formData.append("file", fileList[0]);

      const req = await blogRepository.api.create(formData);

      if (req.status === 201) {
        message.success("Blog created successfully!");
        form.resetFields();
        setFileList([]);
        setPreviewImages([]);
      }
    } catch (error) {
      message.error("Failed to create blog. Please try again.");
    }
  };

  const handleRemove = (file: RcFile) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
    setPreviewImages([]);
  };

  const handleBeforeUpload = (file: RcFile) => {
    if (fileList.length >= 1) {
      message.error("You can only upload one photo.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImages([e.target?.result as string]);
    };
    reader.readAsDataURL(file);

    setFileList([file]); // Only allow one file
    return false;
  };

  return (
    <div>
      <div
        className={`${mediumMontserrat.className} flex items-center gap-2 mb-5`}
      >
        <Link href={"/admin/blog/"} className="no-underline text-black text-sm">
          Blog
        </Link>
        <span>/</span>
        <Link
          href={"/admin/blog/create/"}
          className="no-underline text-black text-sm"
        >
          Create
        </Link>
      </div>

      <div className="bg-white border-solid border-gray-200 border p-7 rounded-xl">
        <div className={`${mediumMontserrat.className} pb-6`}>
          <span className="text-xl font-semibold">Blog Create</span>
          <div className="flex flex-col gap-5 mt-4">
            <Form
              form={form}
              name="blogForm"
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
              requiredMark={false}
            >
              {/* Form Blog Title */}
              <Form.Item
                label={
                  <span className="text-base font-medium text-gray-700">
                    Blog Title
                  </span>
                }
                name="blogTitle"
                rules={[
                  { required: true, message: "Please input the blog title!" },
                ]}
              >
                <Input placeholder="Enter blog title" className="rounded-md" />
              </Form.Item>
              {/* End Form Blog Title */}

              {/* Form Description */}
              <Form.Item
                label={
                  <span className="text-base font-medium text-gray-700">
                    Description
                  </span>
                }
                name="description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea
                  rows={12}
                  placeholder="Enter blog description"
                  className="rounded-md"
                />
              </Form.Item>
              {/* End Form Description */}

              <div className="flex flex-col gap-5">
                <div className={`${mediumMontserrat.className}`}>
                  <p className="text-sm font-semibold">Add photo</p>

                  <div
                    className={`${mediumMontserrat.className} w-full border border-solid border-gray-200 rounded-lg p-6 h-36 cursor-pointer`}
                  >
                    <Upload
                      beforeUpload={(file) =>
                        handleBeforeUpload(file as RcFile)
                      }
                      onRemove={(file) => handleRemove(file as RcFile)}
                      fileList={fileList as any}
                      showUploadList={false}
                      className="w-full flex items-center justify-center"
                    >
                      <div className="flex flex-col items-center justify-center w-full">
                        <RiCamera2Line size={30} className="text-gray-500" />
                        <span className="text-gray-500 mt-2">
                          Click to add photo
                        </span>
                      </div>
                    </Upload>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  {previewImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-full h-40 overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Uploaded photo ${index + 1}`}
                        width={128}
                        height={350}
                        className="rounded-lg object-cover w-full h-full"
                      />
                      <div
                        className="absolute top-0 right-0 p-1 cursor-pointer bg-red-500 text-white rounded-full"
                        onClick={() => handleRemove(fileList[0])}
                      >
                        &times;
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="mt-4">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogInfo;
