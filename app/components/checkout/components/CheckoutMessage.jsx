import React from "react";
const CheckoutMessage = ({ type, message }) => {
  let Message;
  if (type === "alert") {
    Message = (
      <p className="">{message}</p>
    );
  } else if (type === "success") {
    Message = (
      <p className="">{message}</p>
    );
  } else {
    Message = (
      <p className="">
        Please provide shipping details to get tax, shipping cost & delivery
        estimation.
      </p>
    );
  }

  return <div className={`flex items-center gap-4 px-6 py-3 rounded-md ${type === "alert" ? "bg-yellow-400 text-title-work-card" : type === "success" ? "bg-green-200 text-title-work-card" : "bg-gray-secondary/60 text-black/50"}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-full max-w-6 max-h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>{Message}</div>;
};

export default CheckoutMessage;
