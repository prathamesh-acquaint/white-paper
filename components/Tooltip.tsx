import { useState } from "react";

interface PropTypes {
  id: number;
  message: string;
}

export default function Tooltip({ id, message }: PropTypes) {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <a
      tabIndex={id}
      role="link"
      aria-label="tooltip 1"
      className="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-0 focus:ring-0  relative  md:mt-0"
    >
      <div
        className="cursor-pointer"
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        <svg
          aria-haspopup="true"
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-info-circle"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#A0AEC0"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z"></path>
          <circle cx="12" cy="12" r="9"></circle>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
          <polyline points="11 12 12 12 12 16 13 16"></polyline>
        </svg>
      </div>
      {showPopover && (
        <div
          id="tooltip1"
          role="tooltip"
          className="z-20 -mb-20 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-white p-4 rounded"
        >
          <p className="text-sm font-bold text-gray-800 pb-1">{message}</p>
        </div>
      )}
    </a>
  );
}
