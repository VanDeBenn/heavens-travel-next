import React, { useState, useEffect } from "react";
import {
  RiGlassesLine,
  RiHome3Line,
  RiBookmarkFill,
  RiMapPinLine,
} from "react-icons/ri";
import { Rate, Modal, Button, Empty } from "antd";
import Image from "next/image";
import Link from "next/link";
import { wishlistRepository } from "#/repository/wishlists";
import Loading from "#/app/loading";

interface ComponentsProps {
  data: any[];
}

export default function Wishlist({ data }: ComponentsProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [removeItemId, setRemoveItemId] = useState<string>("");
  const [wishlistData, setWishlistData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setWishlistData(data);
    }
  }, [data]);

  const showConfirmModal = (id: string) => {
    setRemoveItemId(id);
    setModalVisible(true);
  };

  const handleRemove = async () => {
    try {
      await wishlistRepository.api.deleteWishlist(removeItemId);

      setWishlistData((prevData) =>
        prevData.filter((item) => item.id !== removeItemId)
      );

      setModalVisible(false);
    } catch (error) {
      console.error("Failed to remove item from wishlist", error);
    }
  };

  // if (!wishlistData.length) {
  //   return <Loading />;
  // }

  // // console.log("data:", wishlistData);
  return (
    <div className="bg-white rounded-xl">
      <p className="text-xl font-semibold my-6 mx-9">Wishlist</p>
      <div className="h-px bg-gray-300"></div>

      <div className="px-8 py-6 grid grid-cols-2 gap-6">

        {wishlistData.map(({ hotel, destination, id }: any) => (
          <div
            key={id}
            className="p-3 border border-solid border-[#DBDBDB] rounded-xl"
          >
            <div className="flex justify-between items-center">
              <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                {destination ? (
                  <RiGlassesLine size={18} color="#ffff" />
                ) : (
                  <RiHome3Line size={18} color="#ffff" />
                )}
                <span className="text-xs font-semibold text-white">
                  {destination ? "Destination" : "Hotel"}
                </span>
              </div>
              <div>
                <RiBookmarkFill
                  size={25}
                  color="#4F28D9"
                  onClick={() => showConfirmModal(id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Link
                href={
                  destination
                    ? `destinations/detail/${id}`
                    : `hotel/detail/${id}`
                }
              >
                <Image
                  src={`${"https://imgs.search.brave.com/Cb0SfcZNuP0OQsADJiTc-OPZ9WbdoJ6KK1bm6RYVTSA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hd3Np/bWFnZXMuZGV0aWsu/bmV0LmlkL2NvbW11/bml0eS9tZWRpYS92/aXN1YWwvMjAyMC8w/Ni8xMC9odXRhbi1i/YW1idS1kaS1rYXdh/c2FuLWJ1a2l0LW1i/YWgtZ2FydXQtMl8x/NjkuanBlZz93PTcw/MCZxPTkw"}`}
                  alt={destination?.name || hotel?.name || "No image available"}
                  width={100}
                  height={100}
                  className="rounded-xl w-44"
                />
              </Link>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                  <Link
                    href={
                      destination
                        ? `destinations/detail/${id}`
                        : `hotel/detail/${id}`
                    }
                    className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                  >
                    {destination?.name || hotel?.name}
                  </Link>
                  <Rate
                    disabled
                    value={destination?.rating || hotel?.rating || 4}
                    allowHalf={false}
                    style={{ fontSize: 16, color: "#F59E0B" }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPinLine size={16} color="#6b7280 " />
                  <span className="text-xs text-gray-500">
                    {`${destination?.address || hotel?.address}`}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  {`${destination?.description || hotel?.description}`}
                </span>
              </div>
            </div>
          </div>
        ))}
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
