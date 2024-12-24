"use client";

import React from "react";
import { Empty, Button } from "antd";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Empty
        description={
          <span className="text-gray-600 text-lg font-medium">
            No Data Available
          </span>
        }
        className="mb-4"
      />
      <Button
        type="primary"
        className="bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => console.log("Redirect or Retry")}
      >
        Add Data
      </Button>
    </div>
  );
};

export default EmptyState;
