"use client";

import EventCard from "@/components/dashboard/EventCard";
import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/dashboard/Pagination";
import { myEvents } from "@/components/data";

type Props = {};

const Page = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);
  const [is2XL, setIs2XL] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const is2XLScreen = window.innerWidth >= 1536;
      setIs2XL(is2XLScreen);
      setEventsPerPage(is2XLScreen ? 8 : 6);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const newTotalPages = Math.ceil(myEvents.length / eventsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [eventsPerPage, myEvents.length, currentPage]);

  const totalPages = Math.ceil(myEvents.length / eventsPerPage);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = myEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pb-16 relative min-h-[82vh] px-4 sm:px-6 md:px-8 xl:px-10 2xl:px-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mb-6">
        <div className="w-full sm:w-auto flex justify-end">
          <p className="text-white font-medium border-2 italic text-sm sm:text-base md:text-lg 2xl:text-xl py-2 px-4 rounded-lg">
            Event Counter: {currentEvents.length}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-4 lg:gap-[1.3%]">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="w-full sm:w-[48%] md:w-[31%] 2xl:w-[24%] mb-6"
          >
            <EventCard
              isFree={event.isFree}
              date={event.date}
              time={event.time}
              location={event.location}
              name={event.name}
              description={event.description}
              id={event.id}
            />
          </div>
        ))}
      </div>

      {/* Pagination at bottom center */}
      <div className="w-full flex justify-center mt-8 md:absolute md:bottom-4 md:right-0 md:justify-end pr-4 md:pr-8 2xl:pr-16">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Page;
