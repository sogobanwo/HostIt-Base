"use client";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();
  const isActive = (route: string) => {
    return pathname.includes(route.replace("/", ""));
  };

  const router = useRouter();
  return (
    <div className="h-[12%] fixed w-full flex items-center z-50 bg-principal">
      <div className="w-[7%] h-full flex items-center justify-center">
        <img
          src="/dash-logo.png"
          alt="logo"
          className="w-12 h-16 2xl:w-16 2xl:h-20"
        />
      </div>
      <div className="2xl:px-12 px-8 flex items-center justify-between w-[93%]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#007CFA] from-30% to-white to-95% bg-clip-text text-transparent">
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          {!isActive("/dashboard") && (
            <Button
              className="2xl:text-lg text-sm h-12 2xl:h-14 w-40 font-semibold rounded-lg bg-subsidiary hover:bg-white hover:text-subsidiary text-white"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log in
            </Button>
          )}

          <div className="bg-subsidiary flex justify-center items-center rounded-full h-12 w-12 2xl:h-14 2xl:w-14">
            <IoIosNotifications
              className="2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px]"
              color={"#FFFFFF"}
            />
          </div>
          <div className="bg-subsidiary flex justify-center items-center rounded-full h-12 w-12 2xl:h-14 2xl:w-14">
            <IoFilter
              className="2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px]"
              color={"#FFFFFF"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
