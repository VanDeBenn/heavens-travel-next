"use client";
import { destinationRepository } from "#/repository/destinations";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [dataDestinations, setDataDestinations] = useState<any[]>([]);
  const [count, setCount] = useState<number>(1);

  function handleIncrement() {
    if (count <= 20) {
      setCount(count + 1);
    }
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const fetchDestinatios = async () => {
    try {
      const res: any = await destinationRepository.api.getDestinations();
      setDataDestinations(res.body.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDestinatios();
  }, []);

  console.log("data desti:", dataDestinations);
  // console.log("desti:", dataDestinations[0].name);
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
            <Link href={`/destinations/detail/${item.id}`}>klik link</Link>
            <button onClick={handleDecrement}>-</button>
            {count}
            <button onClick={handleIncrement}>+</button>
          </>
        ))}
      </div>
    </>
  );
}
