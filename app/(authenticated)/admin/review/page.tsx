"use client";
import ReviewList from "#/app/components/admin/reviewList";
import { reviewRepository } from "#/repository/review";
import React, { useEffect, useState } from "react";

export default function page() {
  const [reviewsData, setReviewsData] = useState<any>();

  const getAllReviews = async () => {
    const res = await reviewRepository.api.getReviews();
    setReviewsData(res.data);
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div>
      <ReviewList data={reviewsData} />
    </div>
  );
}
