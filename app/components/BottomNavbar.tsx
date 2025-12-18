import React from "react";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
      <div className="rounded-xl gap-1.5 bg-[#222222CC] p-1.5 flex justify-between">
        <div className="bg-[#222222] p-4 aspect-square text-white rounded-lg">
          {" "}
          <span className="font-bold ">W.</span>{" "}
        </div>
        <div className="bg-[#222222] p-4 aspect-square text-white rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#787878"
          >
            <path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z" />
          </svg>
        </div>
        <div className="bg-[#222222] p-4 aspect-square text-white rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ebebeb"
          >
            <path d="M480-166.16 220-307.39v-216.92L81.54-600 480-816.92 878.46-600v287.69h-60v-254.46L740-524.31v216.92L480-166.16ZM480-452l273.62-148L480-748 206.38-600 480-452Zm0 217.54 200-108v-149.85L480-383.15 280-492.31v149.85l200 108ZM480-452Zm0 72.31Zm0 0Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
