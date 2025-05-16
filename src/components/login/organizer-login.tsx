import React from "react";
import AttendeeOrganizerCircle from "./attendee-Organizer-Circle";
import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FaUsersRectangle } from "react-icons/fa6";
import Link from "next/link";
type Props = {
  setIsAttendeeLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrganizerLogin = (props: Props) => {
  return (
    <div className="2xl:max-w-[1200px] max-w-[1024px] min-h-screen mx-auto flex flex-col 2xl:pt-28 pt-10 2xl:gap-10">
      <Link href={"/"}>
      <Image
        src={"/logo.png"}
        width={149}
        height={47}
        alt="HostIt logo"
        className="hidden md:flex"
      />
      </Link>
      <div className="flex items-center justify-center">
        <AttendeeOrganizerCircle page="Organize" />
        <div className="relative w-60 h-60 -ml-40">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="50" fill="#007CFA" stroke-width="2" />
          </svg>
        </div>
      </div>
      <h1 className="text-center 2xl:text-6xl text-4xl  font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
        Organizer
      </h1>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-[50%] my-4 bg-transparent border border-subsidiary p-8 relative flex justify-center items-center">
          <div className="absolute top-0 left-0 p-4">
            <FaUsersRectangle
              size={50}
              className="text-subsidiary group-hover:text-white -ml-8 -mt-8 -rotate-45"
            />
          </div>
          <Button className="2xl:text-xl text-lg h-12 2xl:h-14 w-full font-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white">
            Log in
          </Button>
        </Card>
        <p className="2xl:text-2xl text-xl font-semibold">
          Attending an event?{" "}
          <span
            className="text-subsidiary underline hover:text-white cursor-pointer"
            onClick={() => props.setIsAttendeeLogin(true)}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrganizerLogin;
