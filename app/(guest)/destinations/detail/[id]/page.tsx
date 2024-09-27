"use client";
import { cartRepository } from "#/repository/carts";
import { destinationRepository } from "#/repository/destinations";
import { wishlistRepository } from "#/repository/wishlists";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [dataDestinations, setDataDestinations] = useState<any[]>([]);
  const [count, setCount] = useState({ adult: 1, children: 0 });
  const [destinationId, setDestinationId] = useState<string>("");

  const fetchDestinatios = async () => {
    try {
      const res = await destinationRepository.api.getDestination(params.id);
      setDataDestinations([res.data]);
      setDestinationId(res.data.id);
    } catch (error) {}
  };

  const handleCountChange = (
    type: "adult" | "children",
    operation: "increment" | "decrement"
  ) => {
    setCount((prevCount) => ({
      ...prevCount,
      [type]:
        operation === "increment"
          ? Math.min(prevCount[type] + 1, 20)
          : Math.max(prevCount[type] - 1, type === "adult" ? 1 : 0),
    }));
  };

  const handleWishlist = async () => {
    try {
      const data = {
        userId: localStorage.getItem("_id"),
        destinationId: destinationId,
      };
      await wishlistRepository.api.create(data);
    } catch (error) {}
  };

  const handleCart = async () => {
    try {
      const data = {
        userId: localStorage.getItem("_id"),
        destinationId: destinationId,
      };
      await cartRepository.api.create(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDestinatios();
  }, []);

  return (
    <div>
      {dataDestinations.map((item) => (
        <div key={item.id}>
          {item.name} <br />
          {item.address} <br />
          {item.description} <br />
          {item.maxCapacity} <br />
          {item.priceAdult} <br />
          {item.priceChildren}
          {/* Adult Counter */}
          <div>
            Adult:
            <button onClick={() => handleCountChange("adult", "decrement")}>
              -
            </button>
            {count.adult}
            <button onClick={() => handleCountChange("adult", "increment")}>
              +
            </button>
          </div>
          {/* Children Counter */}
          <div>
            Children:
            <button onClick={() => handleCountChange("children", "decrement")}>
              -
            </button>
            {count.children}
            <button onClick={() => handleCountChange("children", "increment")}>
              +
            </button>
          </div>
          <button onClick={handleCart}>Add to Cart</button>
          <button onClick={handleWishlist}>Add to Wishlist</button>
        </div>
      ))}
    </div>
  );
}
