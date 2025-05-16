import React from "react";
import { PiLineVerticalThin } from "react-icons/pi";

type Props = {
    isTicket: boolean
};

const TicketPoap = ({isTicket}: Props) => {
  return (
    <div className="border border-subsidiary 2xl:py-6 py-4 2xl:px-10 px-6 rounded-2xl flex flex-col gap-4">
      <h1 className="2xl:text-2xl text-lg font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
        {isTicket ? "TICKETS" : "POAPs"}
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="2xl:text-5xl text-3xl text-white">1200</h1>
          <p className="text-white 2xl:text-lg text-base">Total</p>
        </div>

        <PiLineVerticalThin className="text-white 2xl:text-8xl text-6xl" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="2xl:text-5xl text-3xl text-white">1100</h1>
          <p className="text-white 2xl:text-lg text-base">Available</p>
        </div>
        <PiLineVerticalThin className="text-white 2xl:text-8xl text-6xl" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="2xl:text-5xl text-3xl text-white">100</h1>
          <p className="text-white 2xl:text-lg text-base">{isTicket ? "Registered" : "Minted"}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketPoap;
