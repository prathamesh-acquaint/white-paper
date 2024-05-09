import React, { Suspense } from "react";
import ResetPassForm from "./ResetPassForm";

const ResetPassword = () => {
  return (
    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      <Suspense>
        <ResetPassForm />
      </Suspense>
    </div>
  );
};

export default ResetPassword;
