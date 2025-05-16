"use client";

import EventCard from "@/components/dashboard/EventCard";
import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/dashboard/Pagination";
import { allEvents } from "@/components/data";

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

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Recalculate current page when events per page changes to avoid showing empty pages
  useEffect(() => {
    const newTotalPages = Math.ceil(allEvents.length / eventsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [eventsPerPage, allEvents.length, currentPage]);

  const totalPages = Math.ceil(allEvents.length / eventsPerPage);

  // Get current events to display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="pb-16 relative min-h-[82vh]">
      <div className="flex flex-wrap lg:gap-[1.3%] 2xl:px-12 px-8">
        {currentEvents.map((event) => (
          <div key={event.id} className="2xl:w-[24%] lg:w-[32%] mb-6">
            <EventCard
              isFree={event.isFree}
              date={event.date}
              time={event.time}
              location={event.location}
              name={event.name}
              description={event.description}
            />
          </div>
        ))}
      </div>

      {/* Pagination at bottom right */}
      <div className="absolute bottom-4 right-8 2xl:right-12">
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
