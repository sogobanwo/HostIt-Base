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
import QRCode from "react-qr-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsFolder } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { RiShieldUserLine } from "react-icons/ri";
import { PiBroadcast } from "react-icons/pi";
import { PiUploadSimpleThin } from "react-icons/pi";
import { TbMessageOff } from "react-icons/tb";
import MerchCard from "@/components/dashboard/MerchCard";
import { FaUserAltSlash } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { MdAnalytics } from "react-icons/md";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [uploadImage, setUploadImage] = React.useState(true);
  const currentEvent = allEvents.find((event) => event.id === Number(id));

  return (
    <Tabs defaultValue="details" className="w-full">
      <div className="mx-8 2xl:mx-12">
        <div className="flex gap-12 w-full">
          <div className="flex items-center justify-between w-2/3 mr-5">
            <div
              className="h-10 flex justify-center items-center w-16 rounded-lg font-semibold bg-subsidiary hover:bg-white hover:text-subsidiary hover:cursor-pointer text-white"
              onClick={() => router.back()}
            >
              <IoIosArrowRoundBack size={40} />
            </div>
            <TabsList className="flex gap-6 bg-transparent border-subsidiary border h-12">
              <TabsTrigger
                value="details"
                className="flex gap-1 text-center items-center justify-center"
              >
                <BsFolder size={20} />
                Details
              </TabsTrigger>
              <TabsTrigger
                value="live-updates"
                className="flex gap-1 text-center items-center justify-center"
              >
                <PiBroadcast size={20} />
                Live Updates
              </TabsTrigger>
              <TabsTrigger
                value="merch"
                className="flex gap-1 text-center items-center justify-center"
              >
                <IoCartOutline size={20} />
                Merch
              </TabsTrigger>
              <TabsTrigger
                value="role"
                className="flex gap-1 text-center items-center justify-center"
              >
                <RiShieldUserLine size={20} />
                Role
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="w-1/3 2xl:px-6 flex items-center justify-end italic">
            <p className="text-white font-medium 2xl:text-xl py-2 px-6 rounded-lg border-2 text-lg">
              14 days to go
            </p>
          </div>
        </div>
        <TabsContent value="details" className="min-h-[82vh]">
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
                  <DialogTrigger
                    className="2xl:text-lg text-sm h-12 2xl:h-14 2xl:w-56 w-48 rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white font-semibold"
                    disabled
                  >
                    Claim Refund
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
                        This event has been cancelled
                      </h1>
                      <Button
                        className="2xl:text-lg text-sm h-12 2xl:h-14 w-52 font-semibold bg-subsidiary hover:bg-white hover:text-subsidiary rounded-xl"
                        onClick={() => {
                          router.push("/attendee-login");
                        }}
                      >
                        Claim refund
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex gap-2 2xl:h-full">
                <div className="w-1/2 h-full">
                  <GooMap />
                </div>
                <div className="w-1/2 h-full flex justify-center items-center">
                  <div className="relative flex items-center justify-center w-full h-full">
                    {/* Outer container for the ticket */}
                    <div className="flex w-full h-full relative">
                      {/* Ticket border image */}
                      <img
                        src="/TicketBorder.png"
                        alt="ticket-border"
                        className="w-full h-full"
                      />

                      {/* QR code container - positioned absolutely to center over the image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col gap-1 items-center bg-white px-3 border-gray-400 rounded-xl 2xl:m-8 m-4">
                          <QRCode
                            value={"ticketData"}
                            className="w-full"
                            size={200}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TicketPoap isTicket={false} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="live-updates" className="min-h-[82vh]">
          <div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent inline-flex my-4">
              Media Library
            </h1>
            <div className="flex justify-between items-end">
              <div className="flex gap-4">
                <div
                  className={`flex flex-col justify-center items-center rounded-xl h-32 w-52 border-subsidiary border cursor-pointer hover:bg-subsidiary ${
                    uploadImage ? "bg-subsidiary" : "bg-transparent"
                  }`}
                  onClick={() => setUploadImage(true)}
                >
                  <h3
                    className={`font-semibold ${
                      uploadImage
                        ? "text-white"
                        : "bg-transparent bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent"
                    }`}
                  >
                    Uploaded Images
                  </h3>
                  <p className="text-white text-4xl">200</p>
                </div>
                <div
                  className={`flex flex-col justify-center items-center rounded-xl h-32 w-52 border-subsidiary border cursor-pointer hover:bg-subsidiary ${
                    !uploadImage ? "bg-subsidiary" : "bg-transparent"
                  }`}
                  onClick={() => setUploadImage(false)}
                >
                  <h3
                    className={`font-semibold ${
                      !uploadImage
                        ? "text-white"
                        : "bg-transparent bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent"
                    }`}
                  >
                    Feedbacks
                  </h3>
                  <p className="text-white text-4xl">0</p>
                </div>
              </div>
              {uploadImage ? (
                <Button
                  className="2xl:text-lg 2xl:mr-6 text-sm h-12 2xl:h-14 w-56 font-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white cursor-pointer"
                  disabled
                >
                  Upload Media
                </Button>
              ) : (
                <Button
                  className="2xl:text-lg 2xl:mr-6 text-sm h-12 2xl:h-14 w-56 font-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white cursor-pointer"
                  disabled
                >
                  Post a Feedback
                </Button>
              )}
            </div>

            {uploadImage ? (
              <div className="2xl:min-h-[50vh] min-h-[650px] flex flex-col gap-10 justify-center items-center">
                <div className="flex flex-col gap-10 justify-center items-center">
                  <ul className="flex flex-col gap-2 text-white">
                    <li className="flex items-center gap-2">
                      <GoDotFill /> Upload clear, high-quality images (no blurry
                      or low-light shots).
                    </li>
                    <li className="flex items-center gap-2">
                      <GoDotFill />
                      Showcase key moments: speakers, crowds, performances, and
                      highlights.
                    </li>
                    <li className="flex items-center gap-2">
                      <GoDotFill />
                      Use real-time photos that reflect the true vibe of the
                      event.
                    </li>
                    <li className="flex items-center gap-2">
                      <GoDotFill />
                      Formats supported: JPG, PNG. Max size: 10MB per image.
                    </li>
                  </ul>
                  <div className="flex flex-col p-4 border border-dashed border-subsidiary rounded-2xl justify-center items-center w-[540px] h-[320px]">
                    <PiUploadSimpleThin size={80} color="#ffffff" />
                    <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent inline-flex my-4">
                      Upload Media
                    </h1>
                    <Button
                      className="2xl:text-lg text-sm h-12 2xl:h-14 w-56 font-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white cursor-pointer"
                      disabled
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="2xl:min-h-[50vh] min-h-[430px] flex flex-col gap-10 justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <TbMessageOff size={150} />
                  <p className="text-white text-xl">No feedbacks yet</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="merch" className="">
          <div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent inline-flex my-4">
              Merchandise
            </h1>
            <div className="flex flex-wrap lg:gap-[1.3%]">
              <div className="2xl:w-[24%] lg:w-[32%] mb-6">
                <MerchCard />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="role" className="min-h-[82vh]">
          <div>
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent inline-flex my-4">
              Assigned Role
            </h1>
            {/* <div className="2xl:min-h-[50vh] min-h-[430px] flex flex-col gap-10 justify-center items-center">
              <div className="flex flex-col justify-center items-center border border-subsidiary rounded-2xl p-10">
                <FaUserAltSlash size={200} />
                <p className="text-white text-xl">No Roles Assigned</p>
              </div>
            </div> */}
            <div className="border boder-white rounded-3xl flex gap-10 w-full py-7 px-7">
              <div className="w-3/5 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold">CHECKIN ASSISTANT</h1>
                  <MdOutlineQrCodeScanner size={40} />
                </div>
                <ul className="flex flex-col gap-2 text-white">
                  <li className="flex items-center gap-2 text-xs">
                    <GoDotFill /> Search by attendee email address or scan their
                    QR code to locate their ticket
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <GoDotFill />
                    Check in attendee and wait for on-chain confirmation .
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter attendee’s email address"
                    className="w-3/4 h-12 px-10"
                  />
                  <Button className="w-1/4 py-4 bg-subsidiary h-12" disabled>
                    Search
                  </Button>
                </div>
              </div>
              <div className="w-2/5 flex flex-col justify-between py-6 px-8 rounded-xl bg-subsidiary text-white">
                <div className="flex items-center gap-2">
                  <MdAnalytics size={20} />
                  <p className="text-lg text-white">TRACKER</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col items-start">
                    <h1 className="text-4xl font-bold text-white">1500</h1>
                    <p className="text-xs">Registered</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-4xl font-bold text-white">0</h1>
                    <p className="text-xs">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Page;
