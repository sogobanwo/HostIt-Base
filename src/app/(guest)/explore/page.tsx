"use client";

import EventCard from "@/components/dashboard/EventCard";
import React, { useEffect, useState } from "react";
import Pagination from "../../../components/dashboard/Pagination";
import { allEvents } from "@/components/data";

type Props = {};

const Page = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);

  useEffect(() => {
    const checkScreenSize = () => {
      const is2XLScreen = window.innerWidth >= 1536;
      const isSM = window.innerWidth < 768;
      setEventsPerPage(is2XLScreen ? 8 : isSM ? 2 : 6);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const newTotalPages = Math.ceil(allEvents.length / eventsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [eventsPerPage, currentPage]);

  const totalPages = Math.ceil(allEvents.length / eventsPerPage);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pb-16 relative min-h-[82vh]">
      <div className="flex flex-wrap gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 2xl:px-12 justify-center">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="w-full sm:w-[48%] md:w-[30%] 2xl:w-[23%] mb-6"
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

      {/* Pagination, mobile responsive */}
      <div className="md:absolute md:bottom-4 flex justify-center right-4 sm:right-6 md:right-8 2xl:right-12 mb-10">
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
