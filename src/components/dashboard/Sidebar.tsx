"use client";

import React from "react";
import { MdExplore } from "react-icons/md";
import { HiTicket } from "react-icons/hi2";
import { IoIosCreate } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (route: string) => {
    return pathname.includes(route.replace("/", ""));
  };

  return (
    <div className="w-[7%] fixed mt-[12vh] h-[88vh] flex items-center justify-between flex-col pt-12 pb-20">
      <div className="flex flex-col gap-5">
        <div className="w-12 2xl:w-16 border-subsidiary border rounded-full flex flex-col justify-center items-center gap-5 py-4 2xl:py-6">
          <div
            className={`${isActive("/explore") ? "bg-subsidiary" : ""
            } hover:bg-subsidiary w-[90%] flex justify-center items-center rounded-full h-10 2xl:h-14`}
            onClick={() => {isActive("/dashboard") ? router.push("/dashboard/attendee/explore") : router.push("/explore")}}
          >
            <MdExplore
              className={`2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px] `}
              color={"#FFFFFF"}
            />
          </div>
          <div className={`${isActive("/my-events") ? "bg-subsidiary" : ""
            } hover:bg-subsidiary w-[90%] flex justify-center items-center rounded-full h-10 2xl:h-14`}
            onClick={() => {isActive("/dashboard") ? router.push("/dashboard/attendee/my-events") : router.push("/login")}} >
            <HiTicket
              className="2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px]"
              color={"#FFFFFF"}
            />
          </div>
          <div className="hover:bg-subsidiary w-[90%] flex justify-center items-center rounded-full h-10 2xl:h-14">
            <IoIosCreate
              className="2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px]"
              color={"#FFFFFF"}
            />
          </div>
        </div>
        <div className="w-12 2xl:w-16 border-subsidiary border rounded-full flex flex-col justify-center items-center">
          <div className="hover:bg-subsidiary w-full flex justify-center items-center rounded-full h-12 2xl:h-16">
            <FaUserAlt
              className="2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px]"
              color={"#FFFFFF"}
            />
          </div>
        </div>
      </div>
      <div className="w-12 2xl:w-16 border-subsidiary border rounded-full flex flex-col justify-center items-center">
        <div className="hover:bg-subsidiary w-full flex justify-center items-center rounded-full h-12 2xl:h-16" onClick={() => {router.push("/")}}>
          <IoLogOut
            className="2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px]"
            color={"#FFFFFF"}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
