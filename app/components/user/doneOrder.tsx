"use client";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";

export default function DoneOrder() {
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const storedBookingId = localStorage.getItem("_booking");
    if (storedBookingId) {
      setBookingId(storedBookingId);
      localStorage.removeItem("_booking");
    }
  }, []);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {bookingId ? (
        <>
          <QRCodeCanvas
            id="qr-gen"
            value={bookingId}
            size={256}
            level="H"
            includeMargin={true}
          />
          <button onClick={downloadQR} className="">
            Download Ticket
          </button>
        </>
      ) : (
        <p>No booking available</p>
      )}
    </div>
  );
}
