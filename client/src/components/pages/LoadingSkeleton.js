import { Skeleton } from "@mui/material";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangle" width={1000} height={400} />
    </div>
  );
};

export default LoadingSkeleton;
