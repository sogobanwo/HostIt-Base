"use client";

import EventCard from "@/components/dashboard/EventCard";
import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/dashboard/Pagination";
import { allEvents } from "@/components/data";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);

  // Adjust events per page based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) setEventsPerPage(8); // 2xl
      else if (width >= 1024) setEventsPerPage(6); // lg
      else if (width >= 768) setEventsPerPage(4); // md (tablet)
      else setEventsPerPage(2); // sm (mobile)
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avoid page overflow when events per page change
  useEffect(() => {
    const newTotalPages = Math.ceil(allEvents.length / eventsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [eventsPerPage, allEvents.length, currentPage]);

  const totalPages = Math.ceil(allEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pb-24 relative min-h-[82vh] px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-3">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            isFree={event.isFree}
            date={event.date}
            time={event.time}
            location={event.location}
            name={event.name}
            description={event.description}
          />
        ))}
      </div>

      {/* Responsive Pagination */}
      <div className="md:absolute md:bottom-4 w-full flex justify-center pr-4 md:pr-8 2xl:pr-16">
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