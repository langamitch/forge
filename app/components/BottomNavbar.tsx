import React from "react";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
      <div className="rounded-xl gap-1.5 bg-[#222222CC] backdrop-blur-sm p-1.5 flex justify-between">
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
            fill="#ffffff"
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
            fill="#ffffff"
          >
            <path d="M140-440v-307.69Q140-778 161-799q21-21 51.31-21H440v380H140Zm240-60Zm140-320h227.69Q778-820 799-799q21 21 21 51.44V-600H520v-220Zm0 680v-380h300v307.69Q820-182 799-161q-21 21-51.31 21H520ZM140-360h300v220H212.31Q182-140 161-161q-21-21-21-51.44V-360Zm240 60Zm200-360Zm0 200Zm-380-40h180v-260H212.31q-5.39 0-8.85 3.46t-3.46 8.85V-500Zm380-160h180v-87.69q0-5.39-3.46-8.85t-8.85-3.46H580v100Zm0 200v260h167.69q5.39 0 8.85-3.46t3.46-8.85V-460H580ZM200-300v87.69q0 5.39 3.46 8.85t8.85 3.46H380v-100H200Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
