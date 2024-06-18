import LoadingSpinner from "@/components/LoadingSpinner";
import React, { Suspense } from "react";

const Stream = React.lazy(() => import('components/Stream'))

export default function StreamPage() {
  return <Suspense fallback={<div className="w-full flex justify-center">
    <LoadingSpinner />
  </div>}>
  <div className="stream-parent">
    <div className="stream-top-spacer"></div>
    <Stream />
  </div>
  </Suspense>
};
