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
      const width = window.innerWidth;

      if (width >= 1536) {
        setIs2XL(true);
        setEventsPerPage(8);
      } else if (width < 640) {
        setEventsPerPage(2); // Phones
      } else if (width < 1024) {
        setEventsPerPage(4); // Tablets
      } else {
        setEventsPerPage(6); // Default desktops
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Recalculate current page when eventsPerPage changes
  useEffect(() => {
    const newTotalPages = Math.ceil(myEvents.length / eventsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [eventsPerPage, myEvents.length, currentPage]);

  const totalPages = Math.ceil(myEvents.length / eventsPerPage);

  // Get current events to display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = myEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Handle page change
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
