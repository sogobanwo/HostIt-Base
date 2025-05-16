"use client";

import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useParams, useRouter } from "next/navigation";
import TicketPoap from "@/components/dashboard/TicketPoap";
import { FaBookmark } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { Button } from "@/components/ui/button";
import GooMap from "@/components/map";
import { allEvents } from "@/components/data";
import { convertDateFormat } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GiPadlock } from "react-icons/gi";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const currentEvent = allEvents.find((event) => event.id === Number(id));

  return (
    <div className="mx-8 2xl:mx-12">
      <div
        className="h-10 flex justify-center items-center w-16 rounded-lg font-semibold bg-subsidiary hover:bg-white hover:text-subsidiary hover:cursor-pointer text-white"
        onClick={() => router.back()}
      >
        <IoIosArrowRoundBack size={40} />
      </div>
      <div className="flex gap-12 my-4">
        <div className="w-2/3 relative">
          <img
            src="/event-image.png"
            alt="event-image"
            className="w-full rounded-3xl 2xl:h-64 h-56 object-cover"
          />

          <div className="absolute top-4 left-4 px-4 py-1 rounded-full font-semibold text-base z-10 border-2 border-white bg-[#13193980] text-white">
            {currentEvent?.isFree ? "Free" : "Paid"}
          </div>
          <div className="2xl:my-10 my-6 border-2 border-subsidiary rounded-full 2xl:w-96 w-72 flex justify-center items-center h-12 2xl:h-14">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent uppercase">
              Description
            </h1>
          </div>
          <p className="text-white 2xl:text-xl text-lg">
            {currentEvent?.description}
          </p>
        </div>
        <div className="w-1/3 2xl:px-6 flex flex-col 2xl:gap-6 gap-4">
          <div>
            <h1 className="2xl:text-3xl text-2xl font-semibold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
              {currentEvent?.name}
            </h1>
            <div className="flex gap-4 items-center">
              <p className="uppercase 2xl:text-lg text-base text-white">
                {convertDateFormat(currentEvent?.date as string)}
              </p>
              <GoDotFill className="text-white text-xl" />
              <p className="uppercase 2xl:text-lg text-base text-white">
                {currentEvent?.time}
              </p>
            </div>
          </div>
          <TicketPoap isTicket />
          <div className="flex items-center justify-end gap-4">
            <div className="bg-subsidiary flex justify-center items-center rounded-full h-12 w-12 2xl:h-14 2xl:w-14">
              <FaBookmark
                className="2xl:w-[30px] 2xl:h-[30px] w-[25px] h-[25px]"
                color={"#FFFFFF"}
              />
            </div>
            <div className="bg-subsidiary flex justify-center items-center rounded-full h-12 w-12 2xl:h-14 2xl:w-14">
              <IoIosShareAlt
                className="2xl:w-[30px] 2xl:h-[30px] w-[25px] h-[25px]"
                color={"#FFFFFF"}
              />
            </div>
            <Dialog>
              <DialogTrigger className="2xl:text-lg text-sm h-12 2xl:h-14 2xl:w-56 w-48ont-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white font-semibold">
                Register
              </DialogTrigger>
              <DialogContent className="border bg-principal border-subsidiary rounded-3xl p-0">
                <div
                  className="p-12 rounded-t-3xl
             bg-subsidiary w-full flex justify-center items-center"
                >
                  <GiPadlock color="#ffffff" size={72} />
                </div>
                <div className="p-8 flex flex-col justify-center items-center gap-4">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
                    Log In Required.
                  </h1>
                  <Button className="2xl:text-lg text-sm h-12 2xl:h-14 w-52 font-semibold bg-subsidiary hover:bg-white hover:text-subsidiary rounded-xl" onClick={() => {router.push("/attendee-login")}}>
                    Log in
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <GooMap />
          </div>
          <TicketPoap isTicket={false} />
        </div>
      </div>
    </div>
  );
};

export default Page;
