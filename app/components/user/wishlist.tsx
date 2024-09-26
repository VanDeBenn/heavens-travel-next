import React, { useState } from "react";
import {
  RiGlassesLine,
  RiHome3Line,
  RiBookmarkFill,
  RiMapPinLine,
} from "react-icons/ri";
import { Rate, Modal, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { wishlistRepository } from "#/repository/wishlists";

interface ComponentsProps {
  id: string;
  data: any;
}

export default function Wishlist({ id, data: initialData }: ComponentsProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [removeItemId, setRemoveItemId] = useState<string>("");
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
  const [data, setData] = useState(initialData);

  const showConfirmModal = (index: number, id: string) => {
    setCurrentItemIndex(index);
    setRemoveItemId(id);
    setModalVisible(true);
  };

  const handleRemove = async () => {
    try {
      await wishlistRepository.api.deleteWishlist(removeItemId);

      setData((prevData: any) => ({
        ...prevData,
        wishlists: prevData.wishlists.filter(
          (item: any) => item.id !== removeItemId
        ),
      }));

      setModalVisible(false);
    } catch (error) {
      console.error("Failed to remove item from wishlist", error);
    }
  };

  return (
    <div className="bg-white rounded-xl">
      <p className="text-xl font-semibold my-6 mx-9">Wishlist</p>
      <div className="h-px bg-gray-300"></div>

      <div className="px-8 py-6 grid grid-cols-2 gap-6">
        {data.wishlists.map(
          ({ hotel, destination, id }: any, index: number) => (
            <div
              key={id}
              className="p-3 border border-solid border-[#DBDBDB] rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                  {hotel ? (
                    <RiHome3Line size={18} color="#ffff" />
                  ) : (
                    <RiGlassesLine size={18} color="#ffff" />
                  )}
                  <span className="text-xs font-semibold text-white">
                    {hotel ? "Hotel" : "Destination"}
                  </span>
                </div>
                <div>
                  <RiBookmarkFill
                    size={25}
                    color="#4F28D9"
                    onClick={() => showConfirmModal(index, id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link href={hotel ? `hotel/${id}` : `destination/${id}`}>
                  <Image
                    src={hotel?.pathLocation || destination?.pathLocation}
                    alt={hotel?.name || destination?.name}
                    width={100}
                    height={100}
                    className="rounded-xl w-44"
                  />
                </Link>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center">
                    <Link
                      href={hotel ? `hotel/${id}` : `destination/${id}`}
                      className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                    >
                      {hotel?.name || destination?.name}
                    </Link>
                    <Rate
                      disabled
                      value={hotel?.rating || destination?.rating}
                      allowHalf={false}
                      style={{ fontSize: 16, color: "#F59E0B" }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <RiMapPinLine size={16} color="#6b7280 " />
                    <span className="text-xs text-gray-500">
                      {hotel?.address || destination?.location}
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">
                    {hotel?.description || destination?.description}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <Modal
        title="Confirm Remove"
        visible={modalVisible}
        closable={false}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="remove"
            type="primary"
            danger
            onClick={handleRemove}
            style={{ backgroundColor: "#4F28D9", borderColor: "#4F28D9" }}
          >
            Remove
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to remove this destination/hotel from your
          wishlist?
        </p>
      </Modal>
    </div>
  );
}
