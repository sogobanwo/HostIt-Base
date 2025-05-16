"use client"

import AttendeeLogin from "@/components/login/attendee-login";
import OrganizerLogin from "@/components/login/organizer-login";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

const Page = (props: Props) => {
  const [isAttendeeLogin, setIsAttendeeLogin] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {isAttendeeLogin ? (
          <motion.div
            key="attendee"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <AttendeeLogin setIsAttendeeLogin={setIsAttendeeLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="organizer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <OrganizerLogin setIsAttendeeLogin={setIsAttendeeLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;