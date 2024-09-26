"use client";
import { cartRepository } from "#/repository/carts";
import { destinationRepository } from "#/repository/destinations";
import { wishlistRepository } from "#/repository/wishlists";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [dataDestinations, setDataDestinations] = useState<any[]>([]);
  const [count, setCount] = useState<number>(1);
  const [destinationId, setDestinationId] = useState<string>("");

  const fetchDestinatios = async () => {
    try {
      const res = await destinationRepository.api.getDestination(params.id);
      setDataDestinations([res.data]);
      setDestinationId(res.data.id);
    } catch (error) {}
  };

  function handleIncrement() {
    if (count < 20) {
      setCount(count + 1);
    }
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const handleWishlist = async () => {
    try {
      const data = {
        userId: localStorage.getItem("_id"),
        destinationId: destinationId,
      };
      const req = await wishlistRepository.api.create(data);
      console.log(req);
    } catch (error: any) {
      const errorMessage = error.response;
      console.log(errorMessage);
    }
  };

  const handleCart = async () => {
    try {
      const data = {
        userId: localStorage.getItem("_id"),
        destinationId: destinationId,
      };
      const req = await cartRepository.api.create(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDestinatios();
  }, []);
  return (
    <>
      <div>
        {dataDestinations.map((item) => (
          <>
            <div key={item.id} className="">
              {item.name} <br />
              {item.address} <br />
              {item.description} <br />
              {/* {item.district.name} <br /> */}
              {item.maxCapacity} <br />
              {item.name} <br />
              {item.pathLocation} <br />
              {item.priceAdult} <br />
              {item.priceChildren}
            </div>
            <button onClick={handleDecrement}>-</button>
            {count}
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleCart}>cart</button>
            <button onClick={handleWishlist}>wishlist</button>
            <button>book now</button>
          </>
        ))}
      </div>
    </>
  );
}
